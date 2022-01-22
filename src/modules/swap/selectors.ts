import { StoreState } from 'store/types'
import { SwapState } from './types'
import { Inputs } from 'modules/shared'
import { createSelector } from '@reduxjs/toolkit'
import { $loadingPrice, $prices, $tokensWithPrices, $transactionSettings } from 'modules/layout/selectors'
import { SWAP_FEE } from './constants'
import { DEFAULT_PRECISION } from 'components/BaseInput'
import { selectorsGeneratorForSwapOrLiquidity } from 'modules/shared/selectors'

export const swap = (state: StoreState) => state.swap

export const { $input0, $input1, $selectedDialogToken, $combinedInput1, $dialog, $combinedInput0 } =
  selectorsGeneratorForSwapOrLiquidity(swap)

export const $confirmingTransaction = createSelector(swap, (swap: SwapState) => swap.confirmingTransaction)

export const $insufficientBalance = createSelector([$combinedInput0, $combinedInput0], (i0, i1) => {
  const i0A = Number(i0.amount)

  return i0A > i0.balance
})

export const $canSwap = createSelector(
  [$combinedInput0, $combinedInput1, $insufficientBalance],
  (i0, i1, invalidBalance) => {
    const i0A = Number(i0.amount)
    const i1A = Number(i1.amount)

    return Boolean(i0A && i1A && i0.token && i1.token && !invalidBalance)
  },
)

export const $swapInfo = createSelector(
  [$combinedInput0, $combinedInput1, $transactionSettings, $loadingPrice],
  (i0, i1, settings, loadingPrice) => {
    const i0Price = Number(i0.price)
    const i1Price = Number(i1.price)
    const rate = (1 / (i1Price || 1)) * (i0Price || 1)

    return {
      loadingPrice,
      i0Symbol: i0.token?.symbol,
      i0Name: i0.token?.name,
      i1Symbol: i1.token?.symbol,
      i1Name: i1.token?.name,
      rate: rate.toFixed(DEFAULT_PRECISION),
      price: Number(i0.price).toFixed(2),
      fee: SWAP_FEE,
      slipTolerance: settings.slippageTolerance,
      total: (
        Number(i1.amount) * Math.abs((Number(SWAP_FEE) + Number(settings.slippageTolerance) - 100) / 100)
      ).toFixed(2),
    }
  },
)
