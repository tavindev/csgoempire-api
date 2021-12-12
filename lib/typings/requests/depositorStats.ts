import { Maybe } from "../utils"

export interface DepositorStatsResponse {
    delivery_rate_recent: Maybe<number>
    delivery_rate_long: Maybe<number>
    delivery_time_minutes_recent: Maybe<number>
    delivery_time_minutes_long: Maybe<number>
    steam_level_min_range: Maybe<number>
    steam_level_max_range: Maybe<number>
    user_has_trade_notifications_enabled: boolean
    user_is_online: null
}
