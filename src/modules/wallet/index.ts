// Components
export { default } from './components/ConnectButton'

// Slice
export { walletReducer, getWalletData } from './slice'

// Selectors
export { wallet, $address, $isConnected, $connecting } from './selectors'

// Types
export type { WalletState } from './types'
