import { InspectDetails } from "../entities/inspectDetails"
import { Item } from "../entities/item"
import { Maybe } from "../utils"

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
    data: Array<Item & { inspect_details: Maybe<InspectDetails> }>
}
