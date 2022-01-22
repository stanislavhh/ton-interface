import { StoreState } from 'store/types'
import { SwapState } from './types'
import { TokenInput } from 'modules/shared'
import { createSelector } from '@reduxjs/toolkit'
import { $loadingPrice, $prices, $tokensWithPrices, $transactionSettings } from 'modules/layout/selectors'
import { Inputs } from './enums'
import { $walletTokens, WalletToken } from 'modules/wallet'
import { TokenPrice } from '../layout/types'
import { SWAP_FEE } from './constants'
import { DEFAULT_PRECISION } from 'components/BaseInput'

export const swap = (state: StoreState) => state.swap

export const $inputFrom = createSelector(swap, (swap: SwapState) => swap.inputFrom)
export const $inputTo = createSelector(swap, (swap: SwapState) => swap.inputTo)
export const $dialog = createSelector(swap, (swap: SwapState) => swap.dialog)
export const $confirmingTransaction = createSelector(swap, (swap: SwapState) => swap.confirmingTransaction)

// I select token in tokens dialog by input type
export const $selectedDialogToken = createSelector(
  [$dialog, $tokensWithPrices, $inputFrom, $inputTo],
  (dialog, tokens, from, to) => {
    if (dialog.input) {
      return (dialog.input === Inputs.INPUT_FROM ? from : to).token || null
    }

    return null
  },
)

const tokenInputCombiner = (input: TokenInput, wTokens: WalletToken[], prices: TokenPrice[]) => {
  return {
    ...input,
    balance: wTokens.find((wToken) => wToken.name === input.token?.name)?.balance || 0,
    price: prices.find(({ name: tokenPriceName }) => tokenPriceName === input.token?.name)?.price || '0',
  }
}

export const $combinedInputFrom = createSelector([$inputFrom, $walletTokens, $prices], tokenInputCombiner)
export const $combinedInputTo = createSelector([$inputTo, $walletTokens, $prices], tokenInputCombiner)

export const $insufficientBalance = createSelector([$combinedInputFrom, $combinedInputTo], (from, to) => {
  const fromA = Number(from.amount)

  return fromA > from.balance
})

export const $canSwap = createSelector(
  [$combinedInputFrom, $combinedInputTo, $insufficientBalance],
  (from, to, invalidBalance) => {
    const fromA = Number(from.amount)
    const toA = Number(to.amount)

    return Boolean(fromA && toA && from.token && to.token && !invalidBalance)
  },
)

export const $swapInfo = createSelector(
  [$combinedInputFrom, $combinedInputTo, $transactionSettings, $loadingPrice],
  (from, to, settings, loadingPrice) => {
    const fromPrice = Number(from.price)
    const toPrice = Number(to.price)
    const rate = (1 / (toPrice || 1)) * (fromPrice || 1)

    return {
      loadingPrice,
      fromSymbol: from.token?.symbol,
      fromName: from.token?.name,
      toSymbol: to.token?.symbol,
      toName: to.token?.name,
      rate: rate.toFixed(DEFAULT_PRECISION),
      price: Number(from.price).toFixed(2),
      fee: SWAP_FEE,
      slipTolerance: settings.slippageTolerance,
      total: (
        Number(to.amount) * Math.abs((Number(SWAP_FEE) + Number(settings.slippageTolerance) - 100) / 100)
      ).toFixed(2),
    }
  },
)
