import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { SwapState, setTokenAction, setAmountAction, setDialogAction } from './types'

export const INITIAL_STATE: SwapState = {
  dialog: { type: '' },
  inputFrom: { token: null, amount: '' },
  inputTo: { token: null, amount: '' },
}

const setTokenReducer: CaseReducer<SwapState, setTokenAction> = (state, { payload }) => {
  const { type, token } = payload

  state[type].token = token
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
