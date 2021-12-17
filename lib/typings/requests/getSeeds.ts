import { Seed } from "./../entities/seed"
import { Maybe } from "../utils"

export interface GetSeedsResponse {
    current_page: number
    data: Array<Seed>
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
