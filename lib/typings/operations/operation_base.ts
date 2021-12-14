import { TRADE_STATUS } from ".."
import { AuctionData } from "../entities/auctionData"
import { Item } from "../entities/item"
import { Maybe } from "../utils"

export interface OperationBase {
    id: number
    user_id: number
    item_id: Maybe<number>
    items: Array<
        Item & {
            created_at: number
            custom_price_percentage: number
        }
    >
    total_value: number
    security_code: string
    tradeoffer_id: number
    trade_id: number
    status: number
    status_message: keyof typeof TRADE_STATUS
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
        expires_at: Maybe<number>
        delivery_time: Maybe<number>
        phishingScamDetected: null
        item_validation: Maybe<{
            validItemDetected: boolean
            numWrongItemDetections: number
            lastWrongItemDetectionTime: Maybe<number>
            validatedAt: number
            firstPendingTradeAlertSent: boolean
            secondPendingTradeAlertSent: boolean
            lastServerMessage: string
            notifyBuyerFound: boolean
            releaseWithdrawerCoins: boolean
        }>
        possible_abuse_detected_at: Maybe<number>
        penalty: null
        service_name: string
        service_invoice_id: number
    }
    created_at: string
    updated_at: string
}
