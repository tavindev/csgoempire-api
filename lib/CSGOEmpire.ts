import { Axios } from "axios"
import io, { Socket } from "socket.io-client"
import { Metadata, UpdateSettingsMethod, ItemDepositData } from "../typings"

export enum TRADE_STATUS {
    Error = -1,
    Pending = 0,
    Received = 1,
    Processing = 2,
    Sending = 3,
    Confirming = 4,
    Sent = 5,
    Completed = 6,
    Declined = 7,
    Canceled = 8,
    TimedOut = 9,
    Credited = 10,
}

export class CSGOEmpire {
    public api: Axios
    public socket?: Socket

    constructor(apiKey?: string, websocketEnabled = true) {
        this.api = new Axios({
            baseURL: "https://csgoempire.com/api/v2",
            withCredentials: true,
            headers: {
                authorization: apiKey ? `Bearer ${apiKey}` : "",
            },
        })

        if (websocketEnabled) {
            this.initSocket()
        }
    }

    private initSocket = async () => {
        const {
            data: { user, socket_signature, socket_token },
        } = await this.getMetadata()

        this.socket = io(
            "wss://trade.csgoempire.com/s/?EIO=3&transport=websocket",
            {
                transports: ["websocket"],
                path: "/s/",
                secure: true,
                rejectUnauthorized: false,
                extraHeaders: {
                    "User-agent": `${user.id} API Bot`,
                }, //this lets the server know that this is a bot
            }
        )

        this.socket.on("connect", async () => {
            // Typescript thinks socket is undefined in this context
            if (!this.socket) throw Error()

            // Log when connected
            console.log(`Connected to websocket`)

            // Emit the data we got earlier to the socket to identify this client as the user
            this.socket.emit("identify", {
                uid: user.id,
                model: user,
                authorizationToken: socket_token,
                signature: socket_signature,
            })

            // Handle the Init event
            this.socket.on("init", (data) => {
                if (data && data.authenticated) {
                    console.log(`Successfully authenticated as ${data.name}`)
                }
            })
        })
    }

    /**
     * @returns the user object, which is used to identify via websocket,
     * as well as socket token (authorizationToken) & socket signature (signature)
     * which are used to authenticate on websocket.
     */
    public getMetadata = async () => {
        return await this.api.get<Metadata>("/metadata/socket")
    }

    /**
     * @returns an array of all items currently being deposited or withdrawn by this account.
     * This does not include bids placed on active items until the auction ends.
     */
    public getActiveTrades = async () => {
        return await this.api.get("/trading/user/trades")
    }

    /**
     * @returns an array of all auctions currently being bid on by this account.
     */
    public getActiveAuctions = async () => {
        return await this.api.get("/trading/user/auctions")
    }

    /**
     * Used to update your tradelink and/or Steam API key
     */
    public updateSettings: UpdateSettingsMethod = async (data) => {
        return await this.api.post("/trading/user/settings", data)
    }

    /**
     * Fetch your inventory from steam and caches it to the database for 1 hour.
     * @param invalid boolean
     */
    public getCSGOInventory = async (invalid = false) => {
        return await this.api.get(`/trading/user/inventory?invalid=${invalid}`)
    }

    /**
     * Get inspected unique info for items in user inventory. Examples include float/sticker data
     */
    public getUniqueInfo = async () => {
        return await this.api.get("/trading/user/inventory/unique-info")
    }

    /**
     * Creates an item deposit
     *
     * Notes: coin_value is in coin cents, so 100.01 coins is represented as 10001
     */
    public createDeposit = async (data: ItemDepositData) => {
        return this.api.post("/trading/deposit", data)
    }

    /**
     * Cancels processing deposit without any bids. Once a bid has been placed items are no longer eligible to be cancelled.
     * @param deposit_id number
     */
    public cancelDeposit = async (deposit_id: number) => {
        return this.api.post(`/trading/deposit/${deposit_id}/cancel`)
    }

    /**
     * Sells an on going auction item to the current auction highest bidder
     * @param deposit_id number
     * @returns
     */
    public sellNow = async (deposit_id: number) => {
        return this.api.post(`/trading/deposit/${deposit_id}/sell`)
    }

    /**
     * Get a list of all items listed on the withdrawals page
     * TODO: params
     */
    public getListedItems = async (page: number, per_page: number) => {
        return await this.api.get(
            `/trading/items?page=${page}&per_page=${per_page}`
        )
    }

    /**
     * Get the depositing users stats from a unique deposit ID
     * @param deposit_id number
     */
    public getDepositorStats = async (deposit_id: number) => {
        return this.api.get(`/trading/deposit/${deposit_id}/stats`)
    }

    /**
     * Withdraw item directly if the auction has expired without being won.
     * @param deposit_id number
     */
    public createWithdawal = async (deposit_id: number) => {
        return this.api.post(`/trading/deposit/${deposit_id}/withdraw`)
    }

    /**
     * Place a bid on an auction.
     * @param deposit_id number
     */
    public placeBid = async (deposit_id: number) => {
        return this.api.post(`/trading/deposit/${deposit_id}/bid`)
    }
}
