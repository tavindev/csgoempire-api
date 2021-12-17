import { Roll } from "../entities/roll"

export interface GetHistoryResponse {
    date: string
    rolls: Array<Roll>
}
