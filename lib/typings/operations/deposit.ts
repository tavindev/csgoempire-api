import { Item } from "../entities/item"
import { Maybe } from "../utils"

export interface Deposit {
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
