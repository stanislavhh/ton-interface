import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { imitateFetch, MockedResponse } from 'utils'
import { pools } from 'mocks/pools'
import { Dialog, Pool, PoolsState } from './types'

export const INITIAL_STATE: PoolsState = {
  list: [],
  loadingList: false,
  dialog: {
    type: '',
  },
  removingPoolsLiquidity: false,
}

export const getPoolsList = createAsyncThunk('pools/getPoolsList', async () => {
  const { data } = (await imitateFetch({ data: pools })) as MockedResponse

  return data as Pool[]
})

export const removeLiquidityFromPool = createAsyncThunk('pools/removeLiquidity', async (_, { dispatch }) => {
  await imitateFetch({ data: '' })
  dispatch(toggleDialog({ type: '' }))
})

const getPoolsListPendingReducer: CaseReducer<PoolsState> = (state) => {
  state.loadingList = true
}

const getPoolsListFulfilledReducer: CaseReducer<PoolsState> = (state, { payload }) => {
  state.list = payload
  state.loadingList = false
}

const toggleDialogReducer: CaseReducer<PoolsState, PayloadAction<Dialog>> = (state, { payload }) => {
  state.dialog = payload
}

const removeLiquidityFromPoolPending: CaseReducer<PoolsState> = (state) => {
  state.removingPoolsLiquidity = true
}

const removeLiquidityFromPoolFulfilled: CaseReducer<PoolsState> = (state) => {
  state.removingPoolsLiquidity = false
}

const poolsSlice = createSlice({
  name: 'pools',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDialog: toggleDialogReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getPoolsList.pending, getPoolsListPendingReducer)
    builder.addCase(getPoolsList.fulfilled, getPoolsListFulfilledReducer)
    builder.addCase(removeLiquidityFromPool.pending, removeLiquidityFromPoolPending)
    builder.addCase(removeLiquidityFromPool.fulfilled, removeLiquidityFromPoolFulfilled)
  },
})

export const { toggleDialog } = poolsSlice.actions

export const poolsReducer = poolsSlice.reducer
