import { SortOrders } from 'modules/shared'
import { PoolsListsSettings } from './types'

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
