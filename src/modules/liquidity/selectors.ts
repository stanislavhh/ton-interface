import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from 'store/types'
import { selectorsGeneratorForSwapOrLiquidity } from 'modules/shared/selectors'
import { $tokensWithPrices } from '../layout/selectors'
import { Inputs } from '../shared'

export const liquidity = (state: StoreState) => state.liquidity

export const { $input0, $input1, $combinedInput1, $dialog, $combinedInput0, $selectedDialogToken } =
  selectorsGeneratorForSwapOrLiquidity(liquidity)
