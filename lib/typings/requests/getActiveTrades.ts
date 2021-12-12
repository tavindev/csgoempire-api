import { Deposit } from "../operations/deposit"
import { Withdrawal } from "../operations/withdraw"

export interface ActiveTradesResponse {
    data: {
        deposits: Array<Deposit>
        withdrawals: Array<Withdrawal>
    }
}
