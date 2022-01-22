import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $prices } from 'modules//layout/selectors'
import {
  Inputs,
  convertTokensAmount,
  canSetAmount,
  CombinedTokenInput,
  setAmountAction,
  InputType,
} from 'modules/shared'

/**
 * When prices update, we update value of Input1
 */
export const useWatchPricesChange = (
  i0: CombinedTokenInput,
  i1: CombinedTokenInput,
  action: (e: { type: InputType } & { amount: string | null }) => setAmountAction,
  type: Inputs,
  allowDispatch: boolean = true,
) => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector($prices)

  const t1Amount = convertTokensAmount(i0, i1)

  if (t1Amount) {
  }

  useEffect(() => {
    if (allowDispatch && canSetAmount(Number(t1Amount))) {
      dispatch(action({ type: type, amount: t1Amount }))
    }
  }, [prices])
}
