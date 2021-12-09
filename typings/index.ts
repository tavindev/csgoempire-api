export interface Metadata {
    user: {
        id: number
    }
    socket_token: string
    socket_signature: string
}

export interface UpdateSettingsParam {
    trade_url: string
    steam_api_key?: string
}

export type UpdateSettingsMethod = (data: UpdateSettingsParam) => Promise<{
    success: boolean
    escrow_seconds: number
}>

export interface ItemDepositData {
    items: Array<{ id: number; custom_price: number; coin_value: number }>
}
