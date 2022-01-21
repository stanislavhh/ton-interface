import { AppState } from 'modules/layout'
import { WalletState } from 'modules/wallet'
import { SwapState } from 'modules/swap'

export interface StoreState {
  app: AppState
  swap: SwapState
  wallet: WalletState
}
