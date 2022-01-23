import { FEE_TIERS } from '../enums'

export const feeTierToPercentage = (fee: FEE_TIERS | null | string) => {
  return Number(fee) / 10000
}
