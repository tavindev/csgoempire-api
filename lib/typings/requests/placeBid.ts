import { AuctionData } from "../entities/auctionData"

export interface PlaceBidResponse {
    success: true
    auction_data: AuctionData
    invoice: {}
}
