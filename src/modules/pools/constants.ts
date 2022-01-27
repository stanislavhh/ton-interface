import { SortOrders } from 'modules/shared'
import { PoolsListsSettings } from './types'
import { SortOption } from 'hooks'

export const ALL_POOLS_INITIAL_OPTIONS: PoolsListsSettings = {
  filterOptions: [{ field: 'name', value: '' }],
  sortOptions: [
    { field: 'feeTier', order: '', type: 'number' },
    { field: 'liquidity', order: SortOrders.DESC, type: 'number' },
    { field: 'volumeUSD', order: '', type: 'number' },
    { field: 'apr', order: '', type: 'number' },
  ],
}

export const MY_POOLS_INITIAL_OPTIONS: PoolsListsSettings = {
  filterOptions: [{ field: 'name', value: '' }],
  sortOptions: [
    { field: 'feeTier', order: '', type: 'number' },
    { field: 'poolShare', order: '', type: 'number' },
    { field: 'myLiquidity', order: SortOrders.DESC, type: 'number' },
    { field: 'dailyIncome', order: '', type: 'number' },
    { field: 'apr', order: '', type: 'number' },
  ],
}

export const POOL_TRANSACTIONS_INITIAL_OPTIONS: { sortOptions: SortOption[] } = {
  sortOptions: [
    { field: 'token0Amount', order: '', type: 'number' },
    { field: 'token1Amount', order: '', type: 'number' },
    { field: 'totalValue', order: '', type: 'number' },
    { field: 'address', order: '', type: 'string' },
    { field: 'date', order: SortOrders.DESC, type: 'date' },
  ],
}
