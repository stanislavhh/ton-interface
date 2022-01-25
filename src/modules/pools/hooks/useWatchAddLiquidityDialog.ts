import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setToken, clearState, setFees, FEE_TIERS } from 'modules/liquidity'
import { Inputs, Token } from 'modules/shared'
import { $poolsDialog } from 'modules/pools/selectors'
import { Dialogs } from 'modules/pools/enums'
import { $tokens } from 'modules/layout/selectors'

/**
 * Prepare liquidity state for add liquidity dialog
 */
export const useWatchAddLiquidityDialog = () => {
  const dispatch = useAppDispatch()
  const { pool, type } = useAppSelector($poolsDialog)
  const tokens = useAppSelector($tokens)
  const open = type === Dialogs.ADD_LIQUIDITY

  useEffect(() => {
    if (open) {
      const token0 = tokens.find((t) => t.name === pool?.token0.name)
      const token1 = tokens.find((t) => t.name === pool?.token1.name)

      dispatch(setToken({ type: Inputs.INPUT_0, token: token0 as Token }))
      dispatch(setToken({ type: Inputs.INPUT_1, token: token1 as Token }))
      dispatch(setFees(pool?.feeTier as FEE_TIERS))
    } else {
      dispatch(clearState())
    }
  }, [open])
}
