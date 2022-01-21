import { CombinedTokenInput } from 'modules/swap/types'
import { DEFAULT_PRECISION } from 'components/BaseInput/BaseInput'

export const convertTokensAmount = (t1: CombinedTokenInput, t2: CombinedTokenInput) => {
  const { price: t1Price, amount: t1Amount } = t1
  const { price: t2Price } = t2

  if (!t2Price || !t1Price || !Boolean(t1Amount)) {
    return ''
  }

  const t2Amount = (Number(t1Price) * Number(t1Amount)) / Number(t2Price)

  // Todo Calculate accuracy
  const precision = DEFAULT_PRECISION - Math.floor(String(Math.round(t2Amount)).length / 3)

  return t2Amount.toFixed(precision >= 0 ? precision : 0)
}
