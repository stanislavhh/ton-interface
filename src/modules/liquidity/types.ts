import { TokenInput, InputType } from 'modules/shared'
import { Dialogs, FEE_TIERS } from './enums'

export interface LiquidityDialog {
  type: Dialogs | ''
  input?: InputType
}

export interface LiquidityState {
  input0: TokenInput
  input1: TokenInput
  dialog: LiquidityDialog
  poolFee: FEE_TIERS
  confirmingTokenTransaction: boolean
  confirmingLiquidity: boolean
}
