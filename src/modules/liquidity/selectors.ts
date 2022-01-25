import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from 'store/types'
import { selectorsGeneratorForSwapOrLiquidity } from 'modules/shared/selectors'
import { $poolsList } from 'modules/pools/selectors'
import { LiquidityState } from './types'
import { $transactionSettings } from 'modules/layout/selectors'
import { DEFAULT_PRECISION } from 'components/BaseInput'
import { findPoolsBySelectedTokens } from './utils'
import { FEE_TIERS } from './enums'

export const liquidity = (state: StoreState) => state.liquidity

export const { $combinedInput1, $dialog, $combinedInput0, $selectedDialogToken } =
  selectorsGeneratorForSwapOrLiquidity(liquidity)

export const $selectedFees = createSelector(liquidity, (l: LiquidityState) => l.poolFee)
export const $confirmingTokenTransaction = createSelector(
  liquidity,
  (l: LiquidityState) => l.confirmingTokenTransaction,
)
export const $confirmingLiquidity = createSelector(liquidity, (l: LiquidityState) => l.confirmingLiquidity)

export const $poolsBySelectedTokens = createSelector(
  [$combinedInput0, $combinedInput1, $poolsList],
  findPoolsBySelectedTokens,
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
  [$combinedInput0, $combinedInput1, $transactionSettings, $selectedFees, $poolByFeeAndSelectedTokens],
  (i0, i1, settings, fees, pool) => {
    const tokensNotReady = Boolean(!i0.token || !i1.token || !i0.price || !i1.price)
    const i0Price = Number(i0.price)
    const i1Price = Number(i1.price)
    const rate = (1 / (i1Price || 1)) * (i0Price || 1)

    const liquiditySum = i0Price * Number(i0.amount) + i1Price * Number(i1.amount)
    const poolShare = pool ? ((liquiditySum / Number(pool.volumeUSD)) * 100).toFixed(DEFAULT_PRECISION) : 100

    return {
      i0,
      i1,
      rate: rate.toFixed(DEFAULT_PRECISION),
      price: Number(i0.price).toFixed(2),
      slipTolerance: settings.slippageTolerance,
      poolShare: !tokensNotReady ? poolShare : null,
      poolFees: !tokensNotReady ? ((pool ? pool.feeTier : fees) as FEE_TIERS) : null,
    }
  },
)
