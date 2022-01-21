import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { setAmountAction, setDialogAction, setTokenAction, SwapState } from './types'
import { Inputs } from './enums'
import { isEqual } from 'utils'

export const INITIAL_STATE: SwapState = {
  dialog: { type: '' },
  inputFrom: { token: null, amount: null },
  inputTo: { token: null, amount: null },
}

const setTokenReducer: CaseReducer<SwapState, setTokenAction> = (state, { payload }) => {
  const { type, token } = payload
  const invertedInput = type === Inputs.INPUT_FROM ? state.inputTo : state.inputFrom

  // closing dialog and if other input has the same token selected - unselecting it
  state.dialog.type = ''

  state[type].token = token

  if (isEqual(invertedInput.token, token)) {
    invertedInput.token = null
  }
}

const setAmountReducer: CaseReducer<SwapState, setAmountAction> = (state, { payload }) => {
  const { type, amount } = payload

  state[type].amount = amount
}

const setDialogReducer: CaseReducer<SwapState, setDialogAction> = (state, { payload }) => {
  state.dialog = payload
}

const swapInputsReducer: CaseReducer<SwapState> = (state) => {
  const inputTo = { ...state.inputTo }
  state.inputTo = state.inputFrom
  state.inputFrom = inputTo
}

const swapSlice = createSlice({
  name: 'swap',
  initialState: INITIAL_STATE,
  reducers: {
    swapInputs: swapInputsReducer,
    setToken: setTokenReducer,
    setAmount: setAmountReducer,
    setDialog: setDialogReducer,
  },
})

export const { setAmount, setToken, swapInputs, setDialog } = swapSlice.actions

export const swapReducer = swapSlice.reducer
