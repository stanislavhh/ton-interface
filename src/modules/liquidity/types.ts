import { TokenInput, InputType } from 'modules/shared'
import { Dialogs } from './enums'

export interface LiquidityDialog {
  type: Dialogs | ''
  input?: InputType
}

export interface LiquidityState {
  input0: TokenInput
  input1: TokenInput
  dialog: LiquidityDialog
  confirmingTokenTransaction: boolean
  confirmingLiquidity: boolean
}
