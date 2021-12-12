import { Maybe } from "../utils"
import { Sticker } from "./sticker"

export interface Item {
    app_id: number
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
    price_is_unreliable: boolean | number
    stickers: Array<Sticker>
    tradable: boolean
    tradelock:
        | false
        | {
              time_left_days: number
              time_left_hours: number
              timestamp: number
          }
    updated_at: string
    wear: Maybe<number>
    id: number
}
