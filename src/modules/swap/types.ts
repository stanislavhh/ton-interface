import { Token, TokenInput, CombinedTokenInput } from 'modules/shared'
import { Dialogs } from './enums'
import { InputType } from 'modules/shared/types'
import { PayloadAction } from '@reduxjs/toolkit'

export interface SwapDialog {
  type: Dialogs | ''
  input?: InputType
}

export interface SwapState {
  dialog: SwapDialog
  input0: TokenInput
  input1: TokenInput
  confirmingTransaction: boolean
}

export type ChangeAmountEvent = { type: InputType; amount: string }

// Actions
export type setTokenAction = PayloadAction<{ type: InputType } & { token: Token | null }>
export type setAmountAction = PayloadAction<{ type: InputType } & { amount: string | null }>
export type setDialogAction = PayloadAction<SwapDialog>

export interface ConfirmTransactionBody {
  i0: CombinedTokenInput
  i1: CombinedTokenInput
}
