import { Inputs } from './enums'
import { LiquidityDialog, LiquidityState } from 'modules/liquidity'
import { SwapDialog, SwapState } from 'modules/swap'
import { PayloadAction } from '@reduxjs/toolkit'

export type LiquidityOrSwapState = LiquidityState | SwapState

export interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export interface TokenWithPrice extends Token {
  price: number
}

export interface TokenWithBalance extends Token {
  balance: number
}

export type InputType = Inputs

export interface TokenInput {
  token: Token | null
  amount: string | null
}

export interface CombinedTokenInput extends TokenInput {
  balance: number
  price: string
  hasPermission: boolean
}

// Actions
export type setTokenAction = PayloadAction<{ type: InputType } & { token: Token | null }>
export type setAmountAction = PayloadAction<{ type: InputType } & { amount: string | null }>
export type setDialogAction = PayloadAction<SwapDialog | LiquidityDialog>
