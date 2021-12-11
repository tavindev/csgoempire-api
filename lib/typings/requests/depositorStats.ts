import { Maybe } from "../utils"

export interface DepositorStatsResponse {
    delivery_rate_recent: number
    delivery_rate_long: number
    delivery_time_minutes_recent: Maybe<number>
    delivery_time_minutes_long: Maybe<number>
    steam_level_min_range: number
    steam_level_max_range: number
    user_has_trade_notifications_enabled: boolean
    user_is_online: Maybe<boolean>
}
