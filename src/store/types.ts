import { LayoutState } from 'modules/layout'
import { WalletState } from 'modules/wallet'
import { SwapState } from 'modules/swap/types'

export interface StoreState {
  app: LayoutState
  wallet: WalletState
  swap: SwapState
}
