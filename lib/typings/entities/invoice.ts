export interface Invoice {
    user_id: number
    status: number
    processor_id: number
    currency_id: number
    amount_coins: number

    ip: string
    updated_at: number
    created_at: number
    id: number
    status_name: string
    processor_name: string
}
