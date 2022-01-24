import { FilterQuery, SortOption } from 'hooks'

export interface PoolToken {
  name: string
  symbol: string
  id: string
}

export interface Pool {
  feeTier: string
  liquidity: string
  token0: PoolToken
  token1: PoolToken
  token0Price: string
  token1Price: string
  totalValueLockedToken0: string
  totalValueLockedToken1: string
  totalValueLockedUSD: string
  apr: string
  txCount: string
  volumeUSD: string
}

export interface PoolSelector extends Pool {
  token0LogoURI: string
  token1LogoURI: string
  name: string
}

export interface WalletPoolsSelector extends PoolSelector {
  poolShare: string
  myLiquidity: string
  dailyIncome: number
}

export interface PoolsState {
  list: Pool[]
  loadingList: boolean
}

export interface PoolsListsSettings {
  filterOptions: FilterQuery[]
  sortOptions: SortOption[]
}
