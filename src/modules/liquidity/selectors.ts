import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { LiquidityState } from './types'

export const liquidity = (state: StoreState) => state.liquidity

export const $input0 = createSelector(liquidity, (l: LiquidityState) => l.input0)
export const $input1 = createSelector(liquidity, (l: LiquidityState) => l.input1)
