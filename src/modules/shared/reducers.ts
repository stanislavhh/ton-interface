import { ValueOf } from 'type-fest'
import { StoreState } from 'store/types'
import { CaseReducer } from '@reduxjs/toolkit'
import { LiquidityOrSwapState, setAmountAction, setDialogAction, setTokenAction } from './types'
import { Inputs } from './enums'
import { isEqual } from 'utils/isEqual'

export const setAmountReducer: CaseReducer<LiquidityOrSwapState, setAmountAction> = (state, { payload }) => {
  const { type, amount } = payload

  state[type].amount = amount
}

export const setDialogReducer: CaseReducer<LiquidityOrSwapState, setDialogAction> = (state, { payload }) => {
  state.dialog = payload
}

export const setTokenReducer: CaseReducer<LiquidityOrSwapState, setTokenAction> = (state, { payload }) => {
  const { type, token } = payload
  const invertedInput = type === Inputs.INPUT_0 ? state.input1 : state.input0

  // closing dialog and if other input has the same token selected - unselecting it
  state.dialog.type = ''

  state[type].token = token

  if (isEqual(invertedInput.token, token)) {
    invertedInput.token = null
  }
}

export const clearStateReducer =
  (initialState: ValueOf<StoreState>): CaseReducer<ValueOf<StoreState>> =>
  (state) => {
    Object.entries(initialState).forEach(([k, v]) => {
      // @ts-ignore
      state[k] = v
    })
  }
