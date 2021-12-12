import { Item } from "../entities/item"

export interface UniqueInfoResponse {
    success: boolean
    data: Array<Pick<Item, "id" | "wear" | "stickers">> & { asset_id: number }
}
