import { AuctionData } from "../entities/auctionData"
import { InspectDetails } from "../entities/inspectDetails"
import { Item } from "../entities/item"
import { Maybe } from "../utils"

type ListedItem = Item &
    AuctionData & {
        inspect_details: Maybe<InspectDetails>
        published_at: string
    }

export interface ListedItemsData {
    search: string
    order: "market_value"
    sort: "asc" | "desc"
    auction: "yes" | "no"
    price_min: number
    price_max: number
    price_max_above: number
}

export interface ListedItemsResponse {
    current_page: number
    data: Array<ListedItem>
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: Maybe<string>
    path: string
    per_page: string
    prev_page_url: Maybe<string>
    to: number
    total: number
}
