import { PayloadAction } from '@reduxjs/toolkit'

export type WalletToken = {
  address: string
  balance: number
  name: string
  hasPermission: boolean
}

export type WalletData = {
  walletTokens: WalletToken[]
}

export type WalletState = {
  connecting: boolean
  walletTokens: WalletToken[]
}

// Actions
export type WalletDataAction = PayloadAction<WalletData>
