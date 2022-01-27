import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { imitateFetch, MockedResponse } from 'utils'
import { pools } from 'mocks/pools'
import { Dialog, Pool, PoolsState, PoolTransaction } from './types'
import { getMockedTransactions } from 'mocks/getMockedTransactions'

export const INITIAL_STATE: PoolsState = {
  list: [],
  loadingList: false,
  loadingPoolTransactions: false,
  dialog: {
    type: '',
  },
  removingPoolsLiquidity: false,
  selectedPoolId: null,
  poolTransactions: [],
}

export const getPoolsList = createAsyncThunk('pools/getPoolsList', async () => {
  const { data } = (await imitateFetch({ data: pools })) as MockedResponse

  return data as Pool[]
})

export const getPoolTransactions = createAsyncThunk('pool/getPoolTransactions', async (pool) => {
  const { data } = (await imitateFetch({
    data: getMockedTransactions(),
  })) as MockedResponse

  return data as PoolTransaction[]
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

const selectPoolIdReducer: CaseReducer<PoolsState, PayloadAction<string | null>> = (state, { payload }) => {
  state.selectedPoolId = payload
}

const getPoolTransactionsPendingReducer: CaseReducer<PoolsState> = (state) => {
  state.loadingPoolTransactions = true
}

const getPoolTransactionsFulfilledReducer: CaseReducer<PoolsState, PayloadAction<PoolTransaction[]>> = (
  state,
  { payload },
) => {
  state.loadingPoolTransactions = false
  state.poolTransactions = payload
}

const poolsSlice = createSlice({
  name: 'pools',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDialog: toggleDialogReducer,
    selectPoolId: selectPoolIdReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getPoolsList.pending, getPoolsListPendingReducer)
    builder.addCase(getPoolsList.fulfilled, getPoolsListFulfilledReducer)
    builder.addCase(removeLiquidityFromPool.pending, removeLiquidityFromPoolPending)
    builder.addCase(removeLiquidityFromPool.fulfilled, removeLiquidityFromPoolFulfilled)
    builder.addCase(getPoolTransactions.pending, getPoolTransactionsPendingReducer)
    builder.addCase(getPoolTransactions.fulfilled, getPoolTransactionsFulfilledReducer)
  },
})

export const { toggleDialog, selectPoolId } = poolsSlice.actions

export const poolsReducer = poolsSlice.reducer
