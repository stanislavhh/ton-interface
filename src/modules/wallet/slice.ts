import { CaseReducer, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WalletState, WalletDataAction, WalletData } from './types'
import { imitateFetch, MockedResponse } from 'utils'
import { walletDataResponse } from './mocks/wallet'

export const INITIAL_STATE: WalletState = {
  connecting: false,
  address: '',
}

/*
 * I am not sure if we need to put wallet data to store, but for convenience I keep it here for now
 */
export const getWalletData = createAsyncThunk('wallet/getWalletData', async () => {
  const { data } = (await imitateFetch(walletDataResponse)) as MockedResponse

  return data as WalletData
})

const setConnectingReducer: CaseReducer<WalletState, any> = (state) => {
  state.connecting = true
}

const setWalletDataReducer: CaseReducer<WalletState, WalletDataAction> = (state, { payload }) => {
  state.connecting = false
  state.address = payload.address
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
