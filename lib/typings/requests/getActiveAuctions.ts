import { AuctionData } from "../entities/auctionData"
import { Item } from "../entities/item"
import { Maybe } from "../utils"

export interface ActiveAuctionsResponse {
    success: boolean
    active_auctions: Array<
        Item &
            AuctionData & {
                custom_price_percentage: Maybe<null>
            }
    >
}
