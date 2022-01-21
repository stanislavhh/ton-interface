import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $prices } from 'modules//layout/selectors'
import { $combinedInputFrom, $combinedInputTo } from '../selectors'
import { setAmount } from '../slice'
import { Inputs } from '../enums'
import { convertTokensAmount } from '../utils'

/**
 * When prices update, we update values of To input
 */
export const useWatchPricesChange = () => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector($prices)
  const inputFrom = useAppSelector($combinedInputFrom)
  const inputTo = useAppSelector($combinedInputTo)

  const t2Amount = convertTokensAmount(inputFrom, inputTo)

  useEffect(() => {
    dispatch(setAmount({ type: Inputs.INPUT_TO, amount: t2Amount }))
  }, [prices])
}
