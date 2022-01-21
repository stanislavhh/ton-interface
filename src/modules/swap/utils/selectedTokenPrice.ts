import { TokenPrice } from 'modules/layout/types'
import { Token } from 'modules/shared'

export const selectedTokenPrice = (prices: TokenPrice[], token: Token) => {
  return prices.find(({ name: tokenPriceName }) => tokenPriceName === token?.name)
}
