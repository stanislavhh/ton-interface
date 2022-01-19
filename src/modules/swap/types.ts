import { Token } from 'modules/shared'
import { Dialogs, Inputs } from './enums'
import { PayloadAction } from '@reduxjs/toolkit'

export interface TokenInput {
  token: Token | null
  amount: string | null
}

export interface SwapDialog {
  type: Dialogs | ''
  input?: InputType
}

export interface SwapState {
  dialog: SwapDialog
  inputFrom: TokenInput
  inputTo: TokenInput
}

export type InputType = Inputs

// Actions
export type setTokenAction = PayloadAction<{ type: InputType } & { token: Token | null }>
export type setAmountAction = PayloadAction<{ type: InputType } & { amount: string | null }>
export type setDialogAction = PayloadAction<SwapDialog>
