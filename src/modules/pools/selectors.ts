import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'

export const pools = (state: StoreState) => state.pools

export const $poolsList = createSelector(pools, (p) => p.list)
export const $pLoadingList = createSelector(pools, (p) => p.loadingList)
