import { StoreState } from 'store/types'
import { SwapState } from './types'
import { createSelector } from '@reduxjs/toolkit'

export const swap = (state: StoreState) => state.swap

export const $inputFrom = createSelector(swap, (swap: SwapState) => swap.inputFrom)
export const $inputTo = createSelector(swap, (swap: SwapState) => swap.inputTo)
export const $dialog = createSelector(swap, (swap: SwapState) => swap.dialog)

export const $tokenFrom = createSelector($inputFrom, (inputFrom) => inputFrom.token)
export const $tokenTo = createSelector($inputTo, (inputTo) => inputTo.token)

export const $amountFrom = createSelector($inputFrom, (inputFrom) => inputFrom.amount)
export const $amountTo = createSelector($inputTo, (inputTo) => inputTo.amount)
