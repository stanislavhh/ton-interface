import { Pool } from 'modules/pools'

export const getBestPoolByVolume = (pools: Pool[]) => {
  return pools.reduce((p, next) => (Number(p.volumeUSD) > Number(next.volumeUSD) ? p : next), pools[0])
}
