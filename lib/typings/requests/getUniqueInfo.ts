import { Item } from "../entities/item"

export interface UniqueInfoResponse {
    success: boolean
    data: Array<Pick<Item, "id" | "asset_id" | "wear" | "stickers">>
}
