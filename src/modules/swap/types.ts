import { Token, TokenInput, CombinedTokenInput } from 'modules/shared'
import { Dialogs } from './enums'
import { InputType } from 'modules/shared/types'

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

export interface ConfirmTransactionBody {
  i0: CombinedTokenInput
  i1: CombinedTokenInput
}
