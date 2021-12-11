import { Item } from "../entities/item"
import { Maybe } from "../utils"

type InventoryItem = Omit<Item, "paint_seed"> & {
    defindex: Maybe<number>
    paintindex: Maybe<number>
    paintseed: Maybe<number>
    paintwear: Maybe<number>
    position: Maybe<number>
    origin: Maybe<number>
    type: string
    inspect_key: Maybe<string>
}

export interface CSGOInventoryResponse {
    success: boolean
    updatedAt: string
    data: Array<InventoryItem> // Incomplete
}
