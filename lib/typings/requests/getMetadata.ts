import { User } from "../entities/user"

export interface MetadataResponse {
    user: User
    socket_token: string
    socket_signature: string
}
