import { AuctionData } from "../entities/auctionData"
import { Item } from "../entities/item"
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
    metadata: AuctionData & {
        price_updated_at: null
        trade_url: 1
        partner: null
        total_fee: Maybe<number>
        fee: Maybe<number>
        old_total_value: Maybe<number>
        item_position_in_inventory: number
        item_inspected: boolean
        steam_id: string
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
