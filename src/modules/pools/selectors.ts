import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { $tokens } from 'modules/layout/selectors'
import { $connecting, $walletTokens } from 'modules/wallet'
import { feeTierToPercentage } from '../liquidity/utils'
import { calculateRate } from 'modules/shared/utils'
import { DEFAULT_PRECISION } from 'components/BaseInput'

export const pools = (state: StoreState) => state.pools

export const $poolsList = createSelector(pools, (p) => p.list)
export const $loadingPools = createSelector(pools, (p) => p.loadingList)
export const $loadingPoolTransactions = createSelector(pools, (p) => p.loadingPoolTransactions)
export const $poolsDialog = createSelector(pools, (p) => p.dialog)
export const $removingPoolsLiquidity = createSelector(pools, (p) => p.removingPoolsLiquidity)
export const $selectedPoolId = createSelector(pools, (p) => p.selectedPoolId)
export const $poolTransactions = createSelector(pools, (p) => p.poolTransactions)

export const $loadingMyPoolsList = createSelector(
  [$loadingPools, $connecting],
  (loadingPools, connecting) => loadingPools || connecting,
)

export const $poolsSelector = createSelector([$poolsList, $tokens], (pools, tokens) => {
  return pools.map((p) => ({
    ...p,
    name: `${p.token0.symbol}/${p.token1.symbol}`,
    rate: calculateRate(Number(p.token0Price), Number(p.token1Price)).toFixed(DEFAULT_PRECISION),
    // the part below needs to be optimized
    token0LogoURI: tokens.find((t) => t.name === p.token0.name)?.logoURI || '',
    token1LogoURI: tokens.find((t) => t.name === p.token1.name)?.logoURI || '',
  }))
})

/**
 * I am not aware how exactly we get pools that user has liquidity, I believe it depends on lp tokens in wallet, but
 *  for now I just filter all pools by wallet tokens which is incorrect but simply enough to show the list on ui
 */
export const $walletPoolsList = createSelector([$poolsSelector, $walletTokens], (pools, tokens) => {
  const tokenAddresses = tokens.map((t) => t.address)

  return pools
    .filter((p) => tokenAddresses.includes(p.token0.id) && tokenAddresses.includes(p.token1.id))
    .map((p) => {
      // Mocking data for ui
      const poolShare = Math.random() / 1000
      const myLiquidity = Number(p.liquidity) * poolShare
      return {
        ...p,
        myLiquidity,
        poolShare: poolShare.toFixed(7),
        dailyIncome:
          (Number(p.volumeUSD) / Number(p.liquidity)) * myLiquidity * feeTierToPercentage(p.feeTier) * poolShare,
      }
    })
})

export const $selectedPoolById = createSelector([$poolsSelector, $selectedPoolId], (pools, poolId) =>
  pools.find(({ id }) => id === poolId),
)

export const $selectedPoolInWallet = createSelector(
  [$walletPoolsList, $selectedPoolById],
  (walletPools, selectedPool) => {
    return walletPools.find(({ id }) => id === selectedPool?.id)
  },
)

export const $selectedPool = createSelector(
  [$selectedPoolById, $selectedPoolInWallet],
  (poolById, poolInWallet) => poolInWallet || poolById,
)
