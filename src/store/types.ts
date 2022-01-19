import { LayoutState } from 'modules/layout'
import { WalletState } from 'modules/wallet'

export interface StoreState {
  app: LayoutState
  wallet: WalletState
}
