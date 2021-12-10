export type Maybe<T> = T | null

export interface Metadata {
    user: {
        id: number
    }
    socket_token: string
    socket_signature: string
}

/**
 * Update Settings Interfaces
 */
export interface UpdateSettingsData {
    trade_url: string
    steam_api_key?: string
}

export interface UpdateSettingsResponse {
    success: boolean
    escrow_seconds: number
}

export type UpdateSettingsFunction = (
    data: UpdateSettingsData
) => Promise<UpdateSettingsResponse>

/**
 * Create Deposit Interfaces
 */
export interface CreateDepositData {
    items: Array<{
        id: number
        custom_price: number
        coin_value: number
    }>
}

export interface CreateDepositResponse {
    success: true
    deposits: {
        success: boolean
        id: string
    }
}

export type CreateDepositFunction = (
    data: CreateDepositData
) => Promise<CreateDepositResponse>

export interface SocketEvents {
    timesync: (data: string) => any
    new_item: (data: NewItemSocketData) => any
    updated_item: (data: UpdatedItemSocketData) => any
    auction_update: (data: AuctionUpdateSocketData) => any
    deleted_item: (data: DeletedItemSocketData) => any
    trade_status: (data: TradeStatusSocketData) => any
}

export interface ExtendedSocket extends SocketIOClient.Socket {
    on: <T extends keyof SocketEvents, K extends SocketEvents[T]>(
        event: T,
        fn: K
    ) => SocketIOClient.Emitter
}

interface Item {
    app_id: number
    auction_auto_withdraw_failed: null
    auction_ends_at: number
    auction_highest_bid: Maybe<number>
    auction_highest_bidder: Maybe<number>
    auction_number_of_bids: Maybe<number>
    custom_name: Maybe<string>
    description_type: string
    icon_url: string
    img: string
    is_commodity: boolean
    market_name: string
    market_value: number
    name: string
    name_color: string
    paint_index: Maybe<number>
    paint_seed: Maybe<number>
    preview_id: Maybe<number>
    price_is_unreliable: number
    stickers: never[]
    tradable: boolean
    tradelock: boolean
    updated_at: string
    wear: Maybe<number>
    published_at: string
    id: number
}

export interface NewItemSocketData extends Item {}

export interface UpdatedItemSocketData extends Item {}

export interface AuctionUpdateSocketData {
    app_id: number
    auction_ends_at: number
    auction_highest_bid: number
    auction_highest_bidder: number
    auction_number_of_bids: number
    id: number
}

export type DeletedItemSocketData = Array<number>

// TODO: Use TRADE_STATUS Enum
export interface TradeStatusSocketData {
    type: string
    data: {
        id: number
        user_id: number
        items: Array<Item>
        total_value: number
        tradeoffer_id: number
        status: number
        status_message: string
        metadata: {
            auction_item_id: string
            auction_highest_bid: Maybe<number>
            auction_highest_bidder: Maybe<number>
            auction_number_of_bids: Maybe<number>
            auction_ends_at: number
            auction_auto_withdraw_failed: null
            timestamp: null
            price_updated_at: null
            trade_url: null
            bot: null
            total_fee: null
            fee: null
            old_total_value: null
            pending_withdrawal_id: Maybe<number>
            item_position_in_inventory: null
            item_inspected: null
            steam_id: string
            phishingScamDetected: null
            item_validation: null
            possible_abuse_detected_at: null
            penalty: null
        }
        created_at: string
        updated_at: string
    }
}
