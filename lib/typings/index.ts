import { AuctionData } from "./entities/auctionData"
import { Item } from "./entities/item"
import { Deposit } from "./operations/deposit"

export interface NewItemSocketData extends Item, AuctionData {
    custom_price_percentage: number
    published_at: string
}

export interface UpdatedItemSocketData extends NewItemSocketData {}

export interface AuctionUpdateSocketData extends AuctionData {}

export type DeletedItemSocketData = Array<number>

// TODO: Use TRADE_STATUS Enum
export interface TradeStatusSocketData {
    type: string
    data: {}
}

export interface SocketEvents {
    timesync: (data: string) => any
    new_item: (data: NewItemSocketData) => any
    updated_item: (data: UpdatedItemSocketData) => any
    auction_update: (data: AuctionUpdateSocketData) => any
    deleted_item: (data: DeletedItemSocketData) => any
    trade_status: (data: TradeStatusSocketData) => any
}

export interface ExtendedSocket extends SocketIOClient.Socket {
    on: <T extends keyof SocketEvents, K extends SocketEvents[T]>(
        event: T,
        fn: K
    ) => SocketIOClient.Emitter
}

// Re-exports
export * from "./requests/cancelDeposit"
export * from "./requests/createDeposit"
export * from "./requests/createWithdrawal"
export * from "./requests/csgoInventory"
export * from "./requests/depositorStats"
export * from "./requests/getActiveAuctions"
export * from "./requests/getActiveTrades"
export * from "./requests/getListedItems"
export * from "./requests/getMetadata"
export * from "./requests/getUniqueInfo"
export * from "./requests/placeBid"
export * from "./requests/sellNow"
export * from "./requests/updateSettings"
export * from "./enums"

// Exports CSGOEmpire class (temp fix?)
export { CSGOEmpire } from "../CSGOEmpire"
