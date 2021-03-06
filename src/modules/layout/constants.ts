export const ROUTES = [
  { path: '/' },
  { path: '/all-pools' },
  { path: '/my-pools' },
  { path: '/pool/:poolId' },
  { path: '/liquidity' },
]

export const NAV_LINKS = [
  { href: '/', text: 'Swap' },
  { href: '/liquidity', text: 'Add Liquidity' },
  { href: '/all-pools', text: 'Pools' },
]

export const SLIPPAGE_TOLERANCE_DEFAULT = '1'
export const TRANSACTION_DECLINE_TIME_DEFAULT = '30'
