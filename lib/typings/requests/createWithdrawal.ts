import { Withdrawal } from "../operations/withdraw"

export interface CreateWithdrawalResponse {
    success: boolean
    data: Withdrawal
}
