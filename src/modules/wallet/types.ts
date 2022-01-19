import { PayloadAction } from '@reduxjs/toolkit'

export type WalletData = {
  address: string
}

export type WalletState = {
  connecting: boolean
  address: string
}

// Actions
export type WalletDataAction = PayloadAction<WalletData>
