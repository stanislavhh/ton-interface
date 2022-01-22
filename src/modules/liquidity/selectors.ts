import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from 'store/types'
import { selectorsGeneratorForSwapOrLiquidity } from 'modules/shared/selectors'
import { $poolsList } from 'modules/pools/selectors'
import { LiquidityState } from './types'
import { $transactionSettings } from '../layout/selectors'

export const liquidity = (state: StoreState) => state.liquidity

export const { $combinedInput1, $dialog, $combinedInput0, $selectedDialogToken } =
  selectorsGeneratorForSwapOrLiquidity(liquidity)

export const $selectedFees = createSelector(liquidity, (l: LiquidityState) => l.poolFee)
export const $confirmingTokenTransaction = createSelector(
  liquidity,
  (l: LiquidityState) => l.confirmingTokenTransaction,
)
export const $confirmingLiquidity = createSelector(liquidity, (l: LiquidityState) => l.confirmingLiquidity)

// While here we have mocks I make a comparison by name
export const $poolsBySelectedTokens = createSelector(
  [$combinedInput0, $combinedInput1, $poolsList],
  (i0, i1, pools) => {
    const selectedTokenNames = [i0.token?.name, i1.token?.name]
    return pools.filter(
      (pool) => selectedTokenNames.includes(pool.token0.name) && selectedTokenNames.includes(pool.token1.name),
    )
  },
)

export const $poolByFeeAndSelectedTokens = createSelector([$selectedFees, $poolsBySelectedTokens], (fees, pools) => {
  return pools.find((pool) => pool.feeTier === fees)
})

export const $insufficientBalance = createSelector([$combinedInput0, $combinedInput1], (i0, i1) => {
  const i0A = Number(i0.amount)
  const i1A = Number(i1.amount)

  return i0A > i0.balance || i1A > i1.balance
})

export const $canAddLiquidity = createSelector(
  [$combinedInput0, $combinedInput1, $insufficientBalance],
  (i0, i1, ib) => {
    const i0A = Number(i0.amount)
    const i1A = Number(i1.amount)

    return Boolean(i0A && i1A && i0.token && i1.token && i0.hasPermission && i1.hasPermission && !ib)
  },
)

export const $liquidityInfo = createSelector(
  [$combinedInput0, $combinedInput1, $transactionSettings],
  (i0, i1, settings) => {},
)
