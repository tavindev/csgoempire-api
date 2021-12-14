import { AuctionData } from "../entities/auctionData"
import { Invoice } from "../entities/invoice"
import { Maybe } from "../utils"

export type PlaceBidResponse =
    | {
          success: true
          auction_data: AuctionData
          invoice: Invoice & {
              complete_at: Maybe<string>
              refunded_at: Maybe<string>
              currency_code: string
              processor_ref: string
          }
      }
    | {
          success: false
          auction_data: AuctionData
          message: string
      }
