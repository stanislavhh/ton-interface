import { CombinedTokenInput } from 'modules/shared'
import { Pool } from 'modules/pools'

// While here we have mocks I make a comparison by name
export const findPoolsBySelectedTokens = (i0: CombinedTokenInput, i1: CombinedTokenInput, pools: Pool[]) => {
  const selectedTokenNames = [i0.token?.name, i1.token?.name]

  return pools.filter(
    (pool) => selectedTokenNames.includes(pool.token0.name) && selectedTokenNames.includes(pool.token1.name),
  )
}
