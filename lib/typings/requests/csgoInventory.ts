import { Item } from "../entities/item"

export interface CSGOInventoryResponse {
    success: boolean
    updatedAt: string
    data: Array<Item> // Incomplete
}
