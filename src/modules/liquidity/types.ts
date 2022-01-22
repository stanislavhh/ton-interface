import { TokenInput } from 'modules/shared'
import { Dialogs, Inputs } from './enums'

export type InputType = Inputs

export interface Dialog {
  dialog: Dialogs | ''
  type?: InputType
}

export interface LiquidityState {
  input0: TokenInput
  input1: TokenInput
  dialog: Dialog
  confirmingTokenTransaction: boolean
  confirmingLiquidity: boolean
}
