import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { WalletState } from './types'

export const wallet = (state: StoreState) => state.wallet

export const $walletTokens = createSelector(wallet, (wallet: WalletState) => wallet.walletTokens)

// just for ui
export const $selectedWToken = createSelector($walletTokens, (wTokens) => wTokens[0])

export const $connecting = createSelector(wallet, (wallet: WalletState) => wallet.connecting)

export const $isConnected = createSelector($walletTokens, (wTokens) => Boolean(wTokens.length))
