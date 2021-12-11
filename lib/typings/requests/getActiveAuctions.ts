import { Item } from "../entities/item"

export interface ActiveAuctionsResponse {
    success: boolean
    active_auctions: Array<Item>
}
