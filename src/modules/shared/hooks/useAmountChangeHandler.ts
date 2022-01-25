import { useCallback } from 'react'
import {
  canSetAmount,
  CombinedTokenInput,
  convertTokensAmount,
  Inputs,
  InputType,
  setAmountAction as setAmountActionType,
} from 'modules/shared'
import { useAppDispatch } from 'hooks'

export const useAmountChangeHandler = (
  inputs: { input0: CombinedTokenInput; input1: CombinedTokenInput },
  setAmountAction: (e: { type: InputType } & { amount: string | null }) => setAmountActionType,
  poolExists: boolean,
) => {
  const dispatch = useAppDispatch()

  const handleAmountChange = (type: InputType) => (amount: string) => {
    dispatch(setAmountAction({ type, amount }))

    if (poolExists) {
      const invertedType = type === Inputs.INPUT_0 ? Inputs.INPUT_1 : Inputs.INPUT_0
      const t0 = inputs[type]
      const t1 = inputs[invertedType]

      const t1Amount = convertTokensAmount({ ...t0, amount: amount || t0.amount }, t1)

      if (canSetAmount(Number(t1Amount))) {
        dispatch(setAmountAction({ type: invertedType, amount: t1Amount }))
      }
    }
  }

  const i0AmountChange = useCallback(handleAmountChange(Inputs.INPUT_0), [inputs, poolExists])
  const i1AmountChange = useCallback(handleAmountChange(Inputs.INPUT_1), [inputs, poolExists])

  return {
    i0AmountChange,
    i1AmountChange,
  }
}
