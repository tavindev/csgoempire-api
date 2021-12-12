import { AuctionData } from "../entities/auctionData"
import { Item } from "../entities/item"
import { Maybe } from "../utils"

export interface Deposit {
    id: number
    user_id: number
    items: Array<
        Item & {
            asset_id: number
            custom_price_percentage: Maybe<number>
            inspect_key: string
        }
    >
    total_value: number
    tradeoffer_id: number
    status: number
    status_message: string
    metadata: AuctionData & {
        price_updated_at: Maybe<string>
        trade_url: Maybe<string>
        total_fee: Maybe<number>
        fee: Maybe<number>
        old_total_value: Maybe<number>
        pending_withdrawal_id: Maybe<number>
        item_position_in_inventory: Maybe<number>
        item_inspected: boolean
        expires_at: Maybe<string>
        delivery_time: Maybe<string>
        phishingScamDetected: null
        item_validation: null
        possible_abuse_detected_at: null
        penalty: null
        service_name: string
        service_invoice_id: number
    }
    created_at: string
    updated_at: string
}
