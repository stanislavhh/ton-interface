import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { imitateFetch, MockedResponse } from 'utils'

import { LiquidityState } from './types'

export const INITIAL_STATE: LiquidityState = {
  input0: {
    token: null,
    amount: '',
  },
  input1: {
    token: null,
    amount: '',
  },
  dialog: {
    type: '',
  },
  confirmingLiquidity: false,
  confirmingTokenTransaction: false,
}

const liquiditySlice = createSlice({
  name: 'liquidity',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {},
})

export const {} = liquiditySlice.actions

export const liquidityReducer = liquiditySlice.reducer
