import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { $tokens } from 'modules/layout/selectors'

export const pools = (state: StoreState) => state.pools

export const $poolsList = createSelector(pools, (p) => p.list)
export const $pLoadingList = createSelector(pools, (p) => p.loadingList)

// this selector is just needed to show logos the list of pools but it is not not optimized at all and i guess won't be needed
export const $poolsSelector = createSelector([$poolsList, $tokens], (pools, tokens) => {
  return pools.map((p) => ({
    ...p,
    name: `${p.token0.symbol}/${p.token1.symbol}`,
    token0LogoURI: tokens.find((t) => t.name === p.token0.name)?.logoURI || '',
    token1LogoURI: tokens.find((t) => t.name === p.token1.name)?.logoURI || '',
  }))
})
