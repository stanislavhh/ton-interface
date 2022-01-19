import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { WalletState } from './types'

export const wallet = (state: StoreState) => state.wallet

export const $address = createSelector(wallet, (wallet: WalletState) => wallet.address)

export const $connecting = createSelector(wallet, (wallet: WalletState) => wallet.connecting)

export const $isConnected = createSelector($address, (address: string) => Boolean(address))
