import { Maybe } from "../utils"

export interface Invoice {
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
