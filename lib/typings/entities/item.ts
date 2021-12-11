import { Maybe } from "../utils"
import { Sticker } from "./sticker"

export interface Item {
    app_id: number
    asset_id: number
    auction_auto_withdraw_failed: null
    auction_ends_at: number
    auction_highest_bid: Maybe<number>
    auction_highest_bidder: Maybe<number>
    auction_number_of_bids: Maybe<number>
    custom_name: Maybe<string>
    description_type: string
    icon_url: string
    img: string
    is_commodity: boolean
    market_name: string
    market_value: number
    name: string
    name_color: string
    paint_index: Maybe<number>
    paint_seed: Maybe<number>
    preview_id: Maybe<number>
    price_is_unreliable: number
    stickers: Array<Sticker>
    tradable: boolean
    tradelock:
        | {
              time_left_days: number
              time_left_hours: number
              timestamp: number
          }
        | boolean
    updated_at: string
    wear: Maybe<number>
    published_at: string
    id: number
}
