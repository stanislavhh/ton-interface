import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { $walletTokens, WalletToken } from 'modules/wallet'
import { TokenPrice } from 'modules/layout/types'
import { TokenInput, LiquidityOrSwapState } from './types'
import { $prices, $tokensWithPrices } from 'modules/layout/selectors'
import { Inputs } from './enums'

const tokenInputCombiner = (input: TokenInput, wTokens: WalletToken[], prices: TokenPrice[]) => {
  const walletToken = wTokens.find((wToken) => wToken.name === input.token?.name)
  return {
    ...input,
    hasPermission: walletToken?.hasPermission || false,
    balance: walletToken?.balance || 0,
    price: prices.find(({ name: tokenPriceName }) => tokenPriceName === input.token?.name)?.price || '0',
  }
}

export function selectorsGeneratorForSwapOrLiquidity(mainSelector: (state: StoreState) => LiquidityOrSwapState) {
  const $input0 = createSelector(mainSelector, (l: LiquidityOrSwapState) => l.input0)
  const $input1 = createSelector(mainSelector, (l: LiquidityOrSwapState) => l.input1)
  const $dialog = createSelector(mainSelector, (l: LiquidityOrSwapState) => l.dialog)

  const $combinedInput0 = createSelector([$input0, $walletTokens, $prices], tokenInputCombiner)
  const $combinedInput1 = createSelector([$input1, $walletTokens, $prices], tokenInputCombiner)

  // I select token in tokens dialog by input type
  const $selectedDialogToken = createSelector(
    [$dialog, $tokensWithPrices, $input0, $input1],
    (dialog, tokens, i0, i1) => {
      if (dialog.input) {
        return (dialog.input === Inputs.INPUT_0 ? i0 : i1).token || null
      }

      return null
    },
  )

  return {
    $input0,
    $input1,
    $dialog,
    $combinedInput0,
    $combinedInput1,
    $selectedDialogToken,
  }
}
