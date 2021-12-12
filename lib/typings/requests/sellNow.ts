import { AuctionData } from "../entities/auctionData"

export interface SellNowResponse {
    success: boolean
    auction_data: AuctionData
}
