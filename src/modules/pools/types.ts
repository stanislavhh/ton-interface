import { FilterQuery, SortOption } from 'hooks'
import { Dialogs } from 'modules/pools/enums'

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

export interface Dialog {
  type: Dialogs | ''
  pool?: PoolSelector | WalletPoolsSelector | null
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
  dialog: Dialog
  removingPoolsLiquidity: boolean
}

export interface PoolsListsSettings {
  filterOptions: FilterQuery[]
  sortOptions: SortOption[]
}
