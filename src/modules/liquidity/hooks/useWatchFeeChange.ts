import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setAmount } from 'modules/liquidity/slice'
import { Inputs } from 'modules/shared'
import { $poolByFeeAndSelectedTokens } from 'modules/liquidity/selectors'

export const useWatchFeeChange = () => {
  const dispatch = useAppDispatch()
  const selectedPool = useAppSelector($poolByFeeAndSelectedTokens)

  /**
   * IF there is no pool with new FEE we keep amounts the same, otherwise when pool exists we clear
   * inputs and ask user to type new values. We need this because before selecting the pool that exist, amount could be any.
   */
  useEffect(() => {
    if (selectedPool) {
      dispatch(setAmount({ type: Inputs.INPUT_0, amount: null }))
      dispatch(setAmount({ type: Inputs.INPUT_1, amount: null }))
    }
  }, [selectedPool])
}
