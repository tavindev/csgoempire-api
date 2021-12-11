import { Sticker } from "./sticker"
import { Maybe } from "../utils"

export interface InspectDetails {
    defindex: number
    paintindex: number
    rarity: number
    quality: number
    paintwear: number
    paintseed: number
    killeaterscoretype: Maybe<number>
    killeatervalue: Maybe<number>
    customname: Maybe<string>
    stickers: Array<Sticker>
    origin: number
    created_at: string
    updated_at: string
}
