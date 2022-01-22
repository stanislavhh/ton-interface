import { AppState } from 'modules/layout'
import { WalletState } from 'modules/wallet'
import { SwapState } from 'modules/swap'
import { PoolsState } from 'modules/pools/types'
import { LiquidityState } from 'modules/liquidity/types'

export interface StoreState {
  app: AppState
  wallet: WalletState
  swap: SwapState
  liquidity: LiquidityState
  pools: PoolsState
}
