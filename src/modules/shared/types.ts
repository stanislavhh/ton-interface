import { Inputs } from './enums'

export interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export interface TokenWithPrice extends Token {
  price: number
}

export interface TokenWithBalance extends Token {
  balance: number
}

export type InputType = Inputs

export interface TokenInput {
  token: Token | null
  amount: string | null
}

export interface CombinedTokenInput extends TokenInput {
  balance: number
  price: string
}

export type ChangeAmountEvent = { type: InputType; amount: string }
