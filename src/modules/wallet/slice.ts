import { CaseReducer, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WalletState, WalletDataAction, WalletData } from './types'
import { imitateFetch, MockedResponse } from 'utils'
import { walletDataResponse } from 'mocks/wallet'
import { toggleAlert } from 'modules/layout'

export const INITIAL_STATE: WalletState = {
  connecting: false,
  walletTokens: [],
}

/*
 * I am not sure if we need to put wallet data to store but I keep it here for now
 */
export const getWalletData = createAsyncThunk('wallet/getWalletData', async (_, { dispatch }) => {
  const { data } = (await imitateFetch(walletDataResponse)) as MockedResponse

  dispatch(toggleAlert({ type: 'success', element: 'Wallet Connected!' }))

  return data as WalletData
})

const setConnectingReducer: CaseReducer<WalletState, any> = (state) => {
  state.connecting = true
}

const setWalletDataReducer: CaseReducer<WalletState, WalletDataAction> = (state, { payload }) => {
  state.connecting = false
  state.walletTokens = payload.walletTokens
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletData.pending, setConnectingReducer)
    builder.addCase(getWalletData.fulfilled, setWalletDataReducer)
  },
})

export const walletReducer = walletSlice.reducer
