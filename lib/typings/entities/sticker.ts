import { Maybe } from "../utils"

export interface Sticker {
    slot: number
    sticker_id: number
    wear: Maybe<number>
    scale: Maybe<number>
    rotation: Maybe<number>
    tint_id: Maybe<number>
    name: string
    image: string
}
