import { Invoice } from "../entities/invoice"
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
        invoice: Omit<Invoice, "ip"> & {
            ip_address: string
            metadata: {
                item_id: number
                custom_price_percentage: number
            }
            processor_ref: string
            provider_friendly_name: string
            Method_friendly_name: Maybe<string>
            currency_code: string
            paid_at: Maybe<string>
            refunded_at: Maybe<string>
        }
    }
}
