import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ConfirmTransactionBody, setAmountAction, setDialogAction, setTokenAction, SwapState } from './types'
import { Inputs } from './enums'
import { imitateFetch, isEqual } from 'utils'
import { toggleAlert } from 'modules/layout'

export const INITIAL_STATE: SwapState = {
  dialog: { type: '' },
  inputFrom: { token: null, amount: null },
  inputTo: { token: null, amount: null },
  confirmingTransaction: false,
}

export const sendTransaction = createAsyncThunk(
  'swap/confirmTransaction',
  async ({ from, to }: ConfirmTransactionBody, { dispatch }) => {
    console.log(from, to)
    await imitateFetch({ data: {} }, true, 2000)
    dispatch(toggleAlert({ type: 'success', element: 'Transaction sent!' }))
    dispatch(setDialog({ type: '' }))
  },
)

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

const sendTransactionPendingReducer: CaseReducer<SwapState> = (state) => {
  state.confirmingTransaction = true
}

const sendTransactionFulfilledReducer: CaseReducer<SwapState> = (state) => {
  state.confirmingTransaction = false
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
  extraReducers: (builder) => {
    builder.addCase(sendTransaction.pending, sendTransactionPendingReducer)
    builder.addCase(sendTransaction.fulfilled, sendTransactionFulfilledReducer)
  },
})

export const { setAmount, setToken, swapInputs, setDialog } = swapSlice.actions

export const swapReducer = swapSlice.reducer
