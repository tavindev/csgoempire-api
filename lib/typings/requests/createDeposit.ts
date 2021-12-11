import { Maybe } from "../utils"

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
