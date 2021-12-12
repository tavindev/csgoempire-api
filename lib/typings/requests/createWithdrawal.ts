import { Invoice } from "../entities/invoice"
import { User } from "../entities/user"
import { Withdrawal } from "../operations/withdraw"

export interface CreateWithdrawalResponse {
    success: boolean
    data: Withdrawal
    invoice: Invoice & {
        metadata: {
            deposit_id: number
        }
        processor_txid: string
        user: Omit<User, "api_token"> & {
            steam_data: {
                user_id: number
                timecreated: number
            }
        }
    }
}
