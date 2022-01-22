import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $prices } from 'modules//layout/selectors'
import { Inputs } from 'modules/shared'
import { $combinedInput0, $combinedInput1 } from 'modules/swap/selectors'
import { setAmount } from 'modules/swap/slice'
import { convertTokensAmount } from 'modules/swap/utils'

/**
 * When prices update, we update values of To input
 */
export const useWatchPricesChange = () => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector($prices)
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)

  const t2Amount = convertTokensAmount(input0, input1)

  useEffect(() => {
    dispatch(setAmount({ type: Inputs.INPUT_1, amount: t2Amount }))
  }, [prices])
}
