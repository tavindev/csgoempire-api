import { Item } from "../entities/item"
import { Maybe } from "../utils"

type InventoryItem = Omit<Item, "paint_seed" | "custom_name" | "stickers"> & {
    defindex: Maybe<number>
    paintindex: Maybe<number>
    paintseed: Maybe<number>
    paintwear: Maybe<number>
    position: Maybe<number>
    origin: Maybe<number>
    inspect_key: Maybe<string>
    customname: Maybe<string>
    quality: Maybe<number>
    rarity: Maybe<number>
    type: string
    stickers: string
    asset_id: number
    context_id: number
}

export interface CSGOInventoryResponse {
    success: boolean
    updatedAt: string
    data: Array<InventoryItem> // Incomplete
}
