import { PayloadAction } from '@reduxjs/toolkit'
import { ReactElement } from 'react'
import { Color } from '@material-ui/lab'
import { Token } from 'modules/shared'

export interface TransactionSettings {
  slippageTolerance: string
  autoTolerance: boolean
  transactionDeclineTime: string
}

export interface Alert {
  type: Color | undefined
  element?: ReactElement | string | undefined | null
}

export interface TokenPrice {
  price: number
  name: string
}

export type AppState = {
  mobileDrawerActive: boolean
  loadingTokens: boolean
  loadingPrice: boolean
  alert: Alert
  tokens: Token[]
  prices: TokenPrice[]
  transactionSettings: TransactionSettings
}

// Actions
export type DrawerAction = PayloadAction<boolean | undefined>
export type AlertAction = PayloadAction<Alert>
export type SetTokensAction = PayloadAction<Token[]>
export type SetTokenPriceAction = PayloadAction<TokenPrice>
export type TransactionSettingsAction = PayloadAction<TransactionSettings>
