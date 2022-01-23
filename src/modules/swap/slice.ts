import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ConfirmTransactionBody, SwapState } from './types'
import { imitateFetch } from 'utils'
import { toggleAlert } from 'modules/layout'
import {
  setAmountAction,
  setDialogAction,
  setTokenAction,
  setAmountReducer,
  setDialogReducer,
  setTokenReducer,
  clearStateReducer,
} from 'modules/shared'

export const INITIAL_STATE: SwapState = {
  dialog: { type: '' },
  input0: { token: null, amount: null },
  input1: { token: null, amount: null },
  confirmingTransaction: false,
}

export const sendTransaction = createAsyncThunk(
  'swap/confirmTransaction',
  async ({ i0, i1 }: ConfirmTransactionBody, { dispatch }) => {
    console.log('TRANSACTION:', { i0, i1 })
    await imitateFetch({ data: {} }, true, 2000)
    dispatch(toggleAlert({ type: 'success', element: 'Transaction sent!' }))
    dispatch(setDialog({ type: '' }))
    dispatch(clearState())
  },
)

const swapInputsReducer: CaseReducer<SwapState> = (state) => {
  const input1 = { ...state.input1 }
  state.input1 = state.input0
  state.input0 = input1
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
    setToken: setTokenReducer as CaseReducer<SwapState, setTokenAction>,
    setAmount: setAmountReducer as CaseReducer<SwapState, setAmountAction>,
    setDialog: setDialogReducer as CaseReducer<SwapState, setDialogAction>,
    clearState: clearStateReducer(INITIAL_STATE) as CaseReducer<SwapState>,
  },
  extraReducers: (builder) => {
    builder.addCase(sendTransaction.pending, sendTransactionPendingReducer)
    builder.addCase(sendTransaction.fulfilled, sendTransactionFulfilledReducer)
  },
})

export const { setAmount, setToken, swapInputs, setDialog, clearState } = swapSlice.actions

export const swapReducer = swapSlice.reducer
