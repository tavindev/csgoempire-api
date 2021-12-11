import { Invoice } from "../entities/invoice"
import { Item } from "../entities/item"
import { User } from "../entities/user"
import { Maybe } from "../utils"

export interface Withdrawal {
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
