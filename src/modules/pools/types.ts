export interface PoolToken {
  decimals: string
  derivedETH: string
  id: string
  name: string
  symbol: string
}

export interface Pool {
  id: string
  feeTier: string
  liquidity: string
  sqrtPrice: string
  tick: string
  token0: PoolToken
  token1: PoolToken
  token0Price: string
  token1Price: string
  totalValueLockedToken0: string
  totalValueLockedToken1: string
  totalValueLockedUSD: string
  txCount: string
  volumeUSD: string
}

export interface PoolsState {
  list: Pool[]
  loadingList: boolean
}
