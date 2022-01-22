import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { imitateFetch, MockedResponse } from 'utils'
import { pools } from 'mocks/pools'
import { Pool, PoolsState } from './types'

export const INITIAL_STATE: PoolsState = {
  list: [],
  loadingList: false,
}

export const getPoolsList = createAsyncThunk('pools/getPoolsList', async () => {
  const { data } = (await imitateFetch({ data: pools })) as MockedResponse

  return data as Pool[]
})

const getPoolsListPendingReducer: CaseReducer<PoolsState> = (state) => {
  state.loadingList = true
}

const getPoolsListFulfilledReducer: CaseReducer<PoolsState> = (state, { payload }) => {
  state.list = payload
  state.loadingList = false
}

const poolsSlice = createSlice({
  name: 'pools',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPoolsList.pending, getPoolsListPendingReducer)
    builder.addCase(getPoolsList.fulfilled, getPoolsListFulfilledReducer)
  },
})

export const {} = poolsSlice.actions

export const poolsReducer = poolsSlice.reducer
