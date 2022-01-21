import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AppState,
  DrawerAction,
  AlertAction,
  SetTokensAction,
  TransactionSettingsAction,
  TokenPrice,
  SetTokenPriceAction,
} from './types'
import { imitateFetch, MockedResponse } from 'utils'
import { tokens } from 'mocks/tokens'
import { Token } from 'modules/shared'
import { TRANSACTION_DECLINE_TIME_DEFAULT, SLIPPAGE_TOLERANCE_DEFAULT } from './constants'

export const INITIAL_STATE: AppState = {
  mobileDrawerActive: false,
  alert: {
    type: undefined,
  },
  loadingTokens: true,
  loadingPrice: false,
  tokens: [],
  prices: [],
  transactionSettings: {
    slippageTolerance: SLIPPAGE_TOLERANCE_DEFAULT,
    autoTolerance: true,
    transactionDeclineTime: TRANSACTION_DECLINE_TIME_DEFAULT,
  },
}

export const getTokenPrice = createAsyncThunk('app/getTokenPrice', async (name: string) => {
  // Mocking random prices
  const { data } = (await imitateFetch({ data: { price: (Math.random() * 100).toFixed(2) } })) as MockedResponse

  return { name, ...data } as TokenPrice
})

export const getTokensList = createAsyncThunk('app/getTokensList', async () => {
  const { data } = (await imitateFetch({ data: tokens })) as MockedResponse

  return data as Token[]
})

// Mobile menu
const toggleDrawerReducer: CaseReducer<AppState, DrawerAction> = (state, { payload }) => {
  state.mobileDrawerActive = typeof payload === 'boolean' ? payload : !state.mobileDrawerActive
}

// Notification system
const toggleAlertReducer: CaseReducer<AppState, AlertAction> = (state, { payload }) => {
  state.alert = payload
}

// tokens list
const setTokensListReducer: CaseReducer<AppState, SetTokensAction> = (state, { payload }) => {
  state.tokens = payload
  state.loadingTokens = false
}

const setTokenPricePendingReducer: CaseReducer<AppState, PayloadAction> = (state) => {
  state.loadingPrice = true
}

const setTokenPriceReducer: CaseReducer<AppState, SetTokenPriceAction> = (state, { payload }) => {
  const currentTokenPrice = state.prices.find(({ name }) => name === payload.name)
  if (currentTokenPrice) {
    currentTokenPrice.price = payload.price
  } else {
    state.prices.push(payload)
  }
  state.loadingPrice = false
}

// transaction settings
const setTransactionSettingsReducer: CaseReducer<AppState, TransactionSettingsAction> = (state, { payload }) => {
  state.transactionSettings = payload
  if (payload.autoTolerance) {
    state.transactionSettings.slippageTolerance = SLIPPAGE_TOLERANCE_DEFAULT
  }
}

const layoutSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDrawer: toggleDrawerReducer,
    toggleAlert: toggleAlertReducer,
    setTransactionSettings: setTransactionSettingsReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getTokensList.fulfilled, setTokensListReducer)
    builder.addCase(getTokenPrice.pending, setTokenPricePendingReducer)
    builder.addCase(getTokenPrice.fulfilled, setTokenPriceReducer)
  },
})

export const { toggleDrawer, toggleAlert, setTransactionSettings } = layoutSlice.actions

export const appReducer = layoutSlice.reducer
