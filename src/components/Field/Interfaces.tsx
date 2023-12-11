import { PlayerSymbol } from "./Enums"

export interface Player {
  symbol: PlayerSymbol,
}

export interface Game {
  result_code: number
  result_description: string
}