import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { imitateFetch } from 'utils'
import { LiquidityState } from './types'
import {
  clearStateReducer,
  CombinedTokenInput,
  setAmountAction,
  setAmountReducer,
  setDialogAction,
  setDialogReducer,
  setTokenAction,
  setTokenReducer,
} from 'modules/shared'
import { Dialogs, FEE_TIERS } from './enums'
import { setWalletTokenConfirmed } from 'modules/wallet'
import { toggleAlert } from 'modules/layout'

export const INITIAL_STATE: LiquidityState = {
  input0: {
    token: null,
    amount: '',
  },
  input1: {
    token: null,
    amount: '',
  },
  poolFee: FEE_TIERS.THREE,
  dialog: {
    type: '',
  },
  confirmingLiquidity: false,
  confirmingTokenTransaction: false,
}

export const allowTokenTransaction = createAsyncThunk(
  'liquidity/allowTokenTransaction',
  async (data: { input: CombinedTokenInput; otherHasPermission: boolean }, { dispatch }) => {
    await imitateFetch({ data: {} }, true)

    dispatch(setWalletTokenConfirmed(data.input))
    dispatch(
      toggleAlert({ type: 'success', element: `Nice! You can make transactions with ${data.input.token?.symbol} now` }),
    )

    return data.otherHasPermission
  },
)

const setFeesReducer: CaseReducer<LiquidityState, PayloadAction<FEE_TIERS>> = (state, { payload }) => {
  state.poolFee = payload
}

const allowTokenTransactionPending: CaseReducer<LiquidityState, PayloadAction> = (state) => {
  state.confirmingTokenTransaction = true
}

const allowTokenTransactionFulfilled: CaseReducer<LiquidityState, PayloadAction<boolean>> = (state, { payload }) => {
  state.confirmingTokenTransaction = false
  if (payload) {
    state.dialog.type = Dialogs.CONFIRM_LIQUIDITY
  }
}

const liquiditySlice = createSlice({
  name: 'liquidity',
  initialState: INITIAL_STATE,
  reducers: {
    setFees: setFeesReducer,
    setToken: setTokenReducer as CaseReducer<LiquidityState, setTokenAction>,
    setAmount: setAmountReducer as CaseReducer<LiquidityState, setAmountAction>,
    setDialog: setDialogReducer as CaseReducer<LiquidityState, setDialogAction>,
    clearState: clearStateReducer(INITIAL_STATE) as CaseReducer<LiquidityState>,
  },
  extraReducers: (builder) => {
    builder.addCase(allowTokenTransaction.pending, allowTokenTransactionPending)
    builder.addCase(allowTokenTransaction.fulfilled, allowTokenTransactionFulfilled)
  },
})

export const { setAmount, setFees, setDialog, setToken, clearState } = liquiditySlice.actions

export const liquidityReducer = liquiditySlice.reducer
