import { Item } from "../entities/item"

export interface SellNowResponse {
    success: boolean
    auction_data: Pick<
        Item,
        | "id"
        | "app_id"
        | "auction_highest_bid"
        | "auction_highest_bidder"
        | "auction_number_of_bids"
        | "auction_ends_at"
    >
}
