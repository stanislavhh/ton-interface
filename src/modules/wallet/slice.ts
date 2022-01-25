import { CaseReducer, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { WalletState, WalletDataAction, WalletData } from './types'
import { imitateFetch, MockedResponse } from 'utils'
import { walletDataResponse } from 'mocks/wallet'
import { toggleAlert } from 'modules/layout'
import { CombinedTokenInput } from '../shared'

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

const setConnectingReducer: CaseReducer<WalletState> = (state) => {
  state.connecting = true
}

const setWalletDataReducer: CaseReducer<WalletState, WalletDataAction> = (state, { payload }) => {
  state.connecting = false
  state.walletTokens = payload.walletTokens
}

const setWalletTokenConfirmedReducer: CaseReducer<WalletState, PayloadAction<CombinedTokenInput>> = (
  state,
  { payload },
) => {
  const i = state.walletTokens.findIndex((wToken) => wToken.name === payload.token?.name)
  if (i !== -1) {
    state.walletTokens[i].hasPermission = true
  }
}

const disconnectWalletReducer: CaseReducer<WalletState> = (state) => {
  state.walletTokens = []
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {
    setWalletTokenConfirmed: setWalletTokenConfirmedReducer,
    disconnectWallet: disconnectWalletReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getWalletData.pending, setConnectingReducer)
    builder.addCase(getWalletData.fulfilled, setWalletDataReducer)
  },
})

export const { setWalletTokenConfirmed, disconnectWallet } = walletSlice.actions

export const walletReducer = walletSlice.reducer
