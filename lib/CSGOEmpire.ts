import { Axios } from "axios"

import io from "socket.io-client"

import {
    ExtendedSocket,
    UpdateSettingsData,
    UpdateSettingsResponse,
    MetadataResponse,
    ActiveTradesResponse,
    ActiveAuctionsResponse,
    CSGOInventoryResponse,
    UniqueInfoResponse,
    CreateDepositData,
    CreateDepositResponse,
    CancelDepositResponse,
    SellNowResponse,
    ListedItemsResponse,
    ListedItemsData,
    DepositorStatsResponse,
    CreateWithdrawalResponse,
    PlaceBidResponse,
    GetSeedsResponse,
    GetHistoryResponse,
    NewItemSocketData,
    SocketEvents,
    AuctionUpdateSocketData,
} from "./typings"

export class CSGOEmpire {
    private api: Axios

    // Trade Socket
    private _socket?: SocketIOClient.Socket
    private socketCallbackCalled: boolean

    // private notificationsSocket: SocketIOClient.Socket

    constructor(apiKey?: string) {
        this.socketCallbackCalled = false
        this.api = new Axios({
            baseURL: "https://csgoempire.com/api/v2",
            headers: {
                authorization: apiKey ? `Bearer ${apiKey}` : "",
                "content-type": "application/json",
                "user-agent": "API Bot",
            },
        })

        /**
         * Axios adapter require data to be
         * a String, ArrayBuffer, Buffer or Stream
         */

        this.api.interceptors.request.use((config) => {
            if (config.data) config.data = JSON.stringify(config.data)

            return config
        })

        // Convert data to JSON if string
        this.api.interceptors.response.use(
            (response) => {
                if (typeof response.data === "string") {
                    response.data = JSON.parse(response.data)
                }

                return response
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }

    public initSocket = (cb: (socket: ExtendedSocket) => void = () => {}) => {
        // Debounce
        if (this._socket) return

        this._socket = io("wss://trade.csgoempire.com/trade", {
            transports: ["websocket"],
            path: "/s/",
            secure: true,
            rejectUnauthorized: false,
            reconnection: true,
            // @ts-ignore
            extraHeaders: {
                "User-Agent": "API Bot",
            },
        })

        this._socket.on("connect", async () => {
            // Typescript thinks socket is undefined in this context
            if (!this._socket) throw Error("Socket is not available")

            const { user, socket_signature, socket_token } =
                await this.getMetadata()

            // Log when connected
            console.log(`Connected to websocket`)

            // Emit the data we got earlier to the socket to identify this client as the user
            this._socket.emit("identify", {
                uid: user.id,
                model: user,
                authorizationToken: socket_token,
                signature: socket_signature,
            })

            // Handle the Init event
            this._socket.on("init", (data: any) => {
                if (data && data.authenticated && !this.socketCallbackCalled) {
                    this.socketCallbackCalled = true
                    console.log(`Successfully authenticated as ${data.name}`)
                    cb(this.socket)
                }
            })
        })
    }

    /**
     * Extended socket instance
     */
    get socket() {
        if (!this._socket) throw Error("Socket is not available")

        const { on, ...rest } = this._socket

        const _socket = { ...rest } as ExtendedSocket

        _socket.on = (event, fn) => {
            // Typescript thinks this could be undefined
            if (!this._socket) throw Error("Socket is not available")

            if (event === "new_item") {
                const _fn = fn as SocketEvents["new_item"]

                return this._socket.on(event, (data: NewItemSocketData) => {
                    const _metadata = { nextBid: data.market_value }

                    _fn({
                        ...data,
                        _metadata,
                        _placeNextBid: async () => {
                            return await this.placeBid(
                                data.id,
                                _metadata.nextBid
                            )
                        },
                    })
                })
            } else if (event === "auction_update") {
                const _fn = fn as SocketEvents["auction_update"]

                return this._socket.on(
                    event,
                    (data: AuctionUpdateSocketData) => {
                        const _metadata = {
                            nextBid: Math.round(
                                data.auction_highest_bid * 1.01
                            ),
                        }

                        _fn({
                            ...data,
                            _metadata,
                            _placeNextBid: async () => {
                                return await this.placeBid(
                                    data.id,
                                    _metadata.nextBid
                                )
                            },
                        })
                    }
                )
            }

            return this._socket.on(event, fn)
        }

        return _socket
    }

    /**
     * @returns the user object, which is used to identify via websocket,
     * as well as socket token (authorizationToken) & socket signature (signature)
     * which are used to authenticate on websocket.
     */
    public getMetadata = async () => {
        return (await this.api.get<MetadataResponse>("/metadata/socket")).data
    }

    /**
     * @returns an array of all items currently being deposited or withdrawn by this account.
     * This does not include bids placed on active items until the auction ends.
     */
    public getActiveTrades = async () => {
        return (
            await this.api.get<ActiveTradesResponse>("/trading/user/trades")
        ).data
    }

    /**
     * @returns an array of all auctions currently being bid on by this account.
     */
    public getActiveAuctions = async () => {
        return (
            await this.api.get<ActiveAuctionsResponse>("/trading/user/auctions")
        ).data
    }

    /**
     * Used to update your tradelink and/or Steam API key
     */
    public updateSettings = async (data: UpdateSettingsData) => {
        return (
            await this.api.post<UpdateSettingsResponse>(
                "/trading/user/settings",
                data
            )
        ).data
    }

    /**
     * Fetch your inventory from steam and caches it to the database for 1 hour.
     * @param invalid {boolean} true or false
     */
    public getCSGOInventory = async (invalid: boolean = false) => {
        return (
            await this.api.get<CSGOInventoryResponse>(
                `/trading/user/inventory?invalid=${invalid ? "yes" : "no"}`
            )
        ).data
    }

    /**
     * Get inspected unique info for items in user inventory. Examples include float/sticker data
     */
    public getUniqueInfo = async () => {
        return (
            await this.api.get<UniqueInfoResponse>(
                "/trading/user/inventory/unique-info"
            )
        ).data
    }

    /**
     * Creates an item deposit
     *
     * Notes: coin_value is in coin cents, so 100.01 coins is represented as 10001
     */
    public createDeposit = async (data: CreateDepositData) => {
        return (
            await this.api.post<CreateDepositResponse>("/trading/deposit", data)
        ).data
    }

    /**
     * Cancels processing deposit without any bids. Once a bid has been placed items are no longer eligible to be cancelled.
     * @param deposit_id {number} The deposited item's id
     */
    public cancelDeposit = async (deposit_id: number) => {
        return (
            await this.api.post<CancelDepositResponse>(
                `/trading/deposit/${deposit_id}/cancel`
            )
        ).data
    }

    /**
     * Sells an on going auction item to the current auction highest bidder
     * @param deposit_id {number} The deposited item's id
     * @returns
     */
    public sellNow = async (deposit_id: number) => {
        return (
            await this.api.post<SellNowResponse>(
                `/trading/deposit/${deposit_id}/sell`
            )
        ).data
    }

    /**
     * Get a list of all items listed on the withdrawals page
     * @param page {number} The page to fetch the data from
     * @param per_page {number} The ammount of items to be fetched per page
     * @param options {Object} An object containing filtering options
     */
    public getListedItems = async (
        page: number,
        per_page: number,
        options?: ListedItemsData
    ) => {
        let queryString = ""

        if (options) {
            for (const key in options) {
                queryString += `&${key}=${
                    options[key as keyof ListedItemsData]
                }`
            }
        }

        return (
            await this.api.get<ListedItemsResponse>(
                `/trading/items?page=${page}&per_page=${per_page}${queryString}`
            )
        ).data
    }

    /**
     * Get the depositing users stats from a unique deposit ID
     * @param deposit_id {number} The deposited item's id
     */
    public getDepositorStats = async (deposit_id: number) => {
        return (
            await this.api.get<DepositorStatsResponse>(
                `/trading/deposit/${deposit_id}/stats`
            )
        ).data
    }

    /**
     * Withdraw item directly if the auction has expired without being won.
     * @param deposit_id {number} The deposited item's id
     */
    public createWithdawal = async (deposit_id: number) => {
        return (
            await this.api.post<CreateWithdrawalResponse>(
                `/trading/deposit/${deposit_id}/withdraw`
            )
        ).data
    }

    /**
     * Place a bid on an auction.
     * @param deposit_id {number} The deposited item's id
     * @param bid_value {number} The ammount to bid
     */
    public placeBid = async (deposit_id: number, bid_value: number) => {
        return (
            await this.api.post<PlaceBidResponse>(
                `/trading/deposit/${deposit_id}/bid`,
                { bid_value }
            )
        ).data
    }

    /**
     * Returns roulette seed
     * @param page {number} The page to fetch the data from
     * @param per_page {number} The ammount of items to be fetched per page
     */
    public getSeeds = async (page: number, per_page: number = 15) => {
        return (
            await this.api.get<GetSeedsResponse>(
                `/metadata/roulette/seeds?per_page=${per_page}&page=${page}`
            )
        ).data
    }

    /**
     * Returns rolls history
     * @param seed {number} The seed to fetch the data from
     */
    public getHistory = async (seed: number) => {
        return (
            await this.api.get<GetHistoryResponse>(
                `/metadata/roulette/history?seed=${seed}`
            )
        ).data
    }
}
