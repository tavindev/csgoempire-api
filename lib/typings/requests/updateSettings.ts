export interface UpdateSettingsData {
    trade_url: string
    steam_api_key?: string
}

export interface UpdateSettingsResponse {
    success: boolean
    escrow_seconds: number
}
