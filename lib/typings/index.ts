export type Maybe<T> = T | null

/**
 * Get Metada
 */
export interface MetadataResponse {
    user: User
    socket_token: string
    socket_signature: string
}

/**
 * Get Active Trades
 */
export interface ActiveTradesResponse {
    data: {
        deposits: Array<Deposit>
        withdrawals: []
    }
}

/**
 * Get Active Auctions
 */
export interface ActiveAuctionsResponse {
    success: boolean
    active_auctions: Array<Item>
}

/**
 * Update Settings
 */
export interface UpdateSettingsData {
    trade_url: string
    steam_api_key?: string
}

export interface UpdateSettingsResponse {
    success: boolean
    escrow_seconds: number
}

/**
 * Get CSGO Inventory
 */
export interface CSGOInventoryResponse {
    success: boolean
    updatedAt: string
    data: Array<Item> // Incomplete
}

/**
 * Get Unique Info
 */
export interface UniqueInfoResponse {
    success: boolean
    data: Array<Pick<Item, "id" | "asset_id" | "wear" | "stickers">>
}

/**
 * Create Deposit
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
        item_id: number
        invoice: {
            user_id: number
            ip_address: string
            status: number
            processor_id: number
            currency_id: number
            amount: number
            amount_coins: number
            metadata: {
                item_id: number
                custom_price_percentage: number
            }
            updated_at: number
            created_at: number
            id: number
            processor_ref: string
            processor_name: string
            provider_friendly_name: string
            Method_friendly_name: Maybe<string>
            status_name: string
            currency_code: string
            paid_at: Maybe<string>
            refunded_at: Maybe<string>
        }
    }
}

/**
 * Cancel Deposit
 */
export interface CancelDepositResponse {
    success: boolean
}

/**
 * Sell Now
 */
export interface SellNowResponse {
    success: boolean
    auction_data: Pick<
        Item,
        | "id"
        | "app_id"
        | "auction_highest_bid"
        | "auction_highest_bidder"
        | "auction_number_of_bids"
        | "auction_ends_at"
    >
}

/**
 * Get Listed Items
 */
export interface ListedItemsData {
    search: string
    order: "market_value"
    sort: "asc" | "desc"
    auction: "yes" | "no"
    price_min: number
    price_max: number
    price_max_above: number
}

export interface ListedItemsResponse {
    current_page: number
    data: Array<Item & { inspect_details: Maybe<InspectDetails> }>
}

/**
 * Get Depositor Stats
 */
export interface DepositorStatsResponse {
    delivery_rate_recent: number
    delivery_rate_long: number
    delivery_time_minutes_recent: Maybe<number>
    delivery_time_minutes_long: Maybe<number>
    steam_level_min_range: number
    steam_level_max_range: number
    user_has_trade_notifications_enabled: boolean
    user_is_online: Maybe<boolean>
}

/**
 * Create Withdrawal
 */
export interface CreateWithdrawalResponse {
    success: boolean
    data: Withdrawal
}

/**
 * Place Bid
 */
export interface PlaceBidResponse {
    success: true
    auction_data: AuctionData
    invoice: {}
}

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

interface Invoice {
    user_id: number
    status: number
    processor_id: number
    currency_id: number
    amount_coins: number
    metadata: {
        deposit_id: number
    }
    ip: string
    updated_at: number
    created_at: number
    id: number
    processor_ref: string
    status_name: string
    processor_name: string
    currency_code: string
    complete_at: Maybe<string>
    refunded_at: Maybe<string>
}

interface User {
    id: number
    steam_id: string
    steam_id_v3: string
    steam_name: string
    avatar: string
    profile_url: string
    registration_timestamp: string
    registration_ip: string
    last_login: string
    balance: number
    total_profit: number
    total_bet: number
    betback_total: number
    bet_threshold: number
    total_trades: number
    total_deposit: number
    total_withdraw: number
    withdraw_limit: number
    csgo_playtime: number
    last_csgo_playtime_cache: string
    trade_url: string
    trade_offer_token: string
    ref_id: number
    total_referral_bet: number
    total_referral_commission: number
    ref_permission: number
    ref_earnings: number
    total_ref_earnings: number
    total_ref_count: number
    total_credit: number
    referral_code: string
    referral_amount: number
    muted_until: number
    mute_reason: string
    admin: number
    super_mod: number
    mod: number
    utm_campaign: string
    country: string
    is_vac_banned: number
    steam_level: number
    last_steam_level_cache: string
    whitelisted: number
    total_tips_received: number
    total_tips_sent: number
    withdrawal_fee_owed: string
    flags: number
    ban: null
    balances: []
    level: number
    xp: number
    socket_token: string
    user_hash: string
    hashed_server_seed: string
    intercom_hash: string
    roles: []
    eligible_for_free_case: boolean
    extra_security_type: string
    total_bet_skincrash: number
    total_bet_matchbetting: number
    total_bet_roulette: number
    total_bet_coinflip: number
    total_bet_supershootout: number
    p2p_telegram_notifications_allowed: true
    p2p_telegram_notifications_enabled: true
    verified: boolean
    hide_verified_icon: boolean
    unread_notifications: []
    last_session: {}
    email: string
    email_verified: boolean
    eth_deposit_address: string
    btc_deposit_address: string
    ltc_deposit_address: string
    bch_deposit_address: string
    steam_inventory_url: string
    steam_api_key: string
    has_crypto_deposit: true
    chat_tag: {}
    linked_accounts: []
    api_token: string
}

interface InspectDetails {
    defindex: number
    paintindex: number
    rarity: number
    quality: number
    paintwear: number
    paintseed: number
    killeaterscoretype: Maybe<number>
    killeatervalue: Maybe<number>
    customname: Maybe<string>
    stickers: Array<Sticker>
    origin: number
    created_at: string
    updated_at: string
}

interface Sticker {
    slot: number
    sticker_id: number
    wear: Maybe<number>
    scale: Maybe<number>
    rotation: Maybe<number>
    tint_id: Maybe<number>
    name: string
    image: string
}

interface Withdrawal {
    id: number
    user_id: number
    item_id: Maybe<number>
    items: Array<Item>
    total_value: number
    security_code: string
    tradeoffer_id: number
    trade_id: number
    status: number
    status_message: string
    metadata: {
        auction_highest_bid: null
        auction_highest_bidder: null
        auction_number_of_bids: 0
        auction_ends_at: number
        auction_auto_withdraw_failed: null
        price_updated_at: null
        trade_url: 1
        partner: null
        total_fee: null
        fee: null
        old_total_value: null
        item_position_in_inventory: number
        item_inspected: boolean
        steam_id: string
        expires_at: null
        delivery_time: null
        phishingScamDetected: null
        item_validation: null
        possible_abuse_detected_at: null
        penalty: null
        service_name: string
        service_invoice_id: number
    }
    created_at: string
    updated_at: string
    invoice: Invoice & {
        user: Omit<User, "api_token"> & {
            steam_data: {
                user_id: number
                timecreated: number
            }
        }
        processor_txid: string
    }
}

interface Deposit {
    id: number
    user_id: number
    items: Array<Item & { custom_price_percentage: Maybe<number> }>
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

interface Item {
    app_id: number
    asset_id: number
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
    stickers: Array<Sticker>
    tradable: boolean
    tradelock:
        | {
              time_left_days: number
              time_left_hours: number
              timestamp: number
          }
        | boolean
    updated_at: string
    wear: Maybe<number>
    published_at: string
    id: number
}

interface AuctionData {
    id: number
    app_id: number
    auction_ends_at: number
    auction_highest_bid: number
    auction_highest_bidder: number
    auction_number_of_bids: number
}

export interface NewItemSocketData extends Item {}

export interface UpdatedItemSocketData extends Item {}

export interface AuctionUpdateSocketData extends AuctionData {}

export type DeletedItemSocketData = Array<number>

// TODO: Use TRADE_STATUS Enum
export interface TradeStatusSocketData {
    type: string
    data: Deposit
}
