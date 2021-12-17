export interface Roll {
    coin: "t" | "ct" | "bonus"
    id: number
    is_bonus_pot: boolean
    multiplier: number
    roll: number
    time: string
}
