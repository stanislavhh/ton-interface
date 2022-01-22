import { CombinedTokenInput } from 'modules/shared'
import { DEFAULT_PRECISION } from 'components/BaseInput'

export const canSetAmount = (amount: number) => !isNaN(amount) && isFinite(amount)

export const convertTokensAmount = (t0: CombinedTokenInput, t1: CombinedTokenInput) => {
  const { price: t0Price, amount: t0Amount } = t0
  const { price: t1Price } = t1

  if (!t1Price || !t0Price || !Boolean(t0Amount)) {
    return ''
  }

  const t1Amount = (Number(t0Price) * Number(t0Amount)) / Number(t1Price)

  // Todo Calculate accuracy
  const precision = DEFAULT_PRECISION - Math.floor(String(Math.round(t1Amount)).length / 3)

  return t1Amount.toFixed(precision >= 0 ? precision : 0)
}
