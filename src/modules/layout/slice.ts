import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LayoutState, DrawerAction, AlertAction, SetTokensAction } from './types'
import { imitateFetch, MockedResponse } from 'utils'
import { tokens } from 'mocks/tokens'
import { Token } from 'modules/shared'

export const INITIAL_STATE: LayoutState = {
  mobileDrawerActive: false,
  alert: {
    type: undefined,
  },
  tokens: [],
}

export const getTokensList = createAsyncThunk('app/getTokensList', async () => {
  const { data } = (await imitateFetch({ data: tokens })) as MockedResponse

  return data as Token[]
})

const toggleDrawerReducer: CaseReducer<LayoutState, DrawerAction> = (state, { payload }) => {
  state.mobileDrawerActive = typeof payload === 'boolean' ? payload : !state.mobileDrawerActive
}

const toggleAlertReducer: CaseReducer<LayoutState, AlertAction> = (state, { payload }) => {
  state.alert = payload
}

const setTokensListReducer: CaseReducer<LayoutState, SetTokensAction> = (state, { payload }) => {
  state.tokens = payload
}

const layoutSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDrawer: toggleDrawerReducer,
    toggleAlert: toggleAlertReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getTokensList.fulfilled, setTokensListReducer)
  },
})

export const { toggleDrawer, toggleAlert } = layoutSlice.actions

export const appReducer = layoutSlice.reducer
