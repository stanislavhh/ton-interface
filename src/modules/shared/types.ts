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

export interface TokenInput {
  token: Token | null
  amount: string | null
}
