import { PoolSelector, WalletPoolsSelector } from 'modules/pools/types'

export const isPoolInUsersWalletList = (pool?: PoolSelector | WalletPoolsSelector) => 'dailyIncome' in (pool || {})
