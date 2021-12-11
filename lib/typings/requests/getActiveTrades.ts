import { Deposit } from "../operations/deposit"

export interface ActiveTradesResponse {
    data: {
        deposits: Array<Deposit>
        withdrawals: []
    }
}
