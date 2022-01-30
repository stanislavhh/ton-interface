import { useAppDispatch, useAppSelector } from 'hooks'
import { $loadingPools, $poolsDialog, $removingPoolsLiquidity, $selectedPool } from 'modules/pools/selectors'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { AddLiquidityDialog } from 'modules/liquidity/components/AddLiquidityDialog'
import { RemoveLiquidityDialog } from 'modules/liquidity/components/RemoveLiquidityDialog'
import { Dialogs } from 'modules/pools/enums'
import { removeLiquidityFromPool, toggleDialog } from 'modules/pools/slice'
import { useWatchAddLiquidityDialog, useWatchSelectedPool } from 'modules/pools/hooks'
import ConfirmLiquidityDialog from 'modules/liquidity/components/ConfirmLiquidityDialog'
import { Dialogs as LiquidityDialogs } from 'modules/liquidity'
import { $dialog } from 'modules/liquidity/selectors'
import { WalletPoolsSelector } from 'modules/pools/types'
import { $transactionSettings } from 'modules/layout/selectors'
import { PoolInfo } from 'modules/pools/components/PoolInfo'
import { PoolTransactionsList } from 'modules/pools/components/PoolTransactionsList'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { PoolNotFound } from 'modules/pools/components/PoolNotFound'

export const Pool = () => {
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)
  const liquidityDialog = useAppSelector($dialog)
  const pool = useAppSelector($selectedPool)
  const tSettings = useAppSelector($transactionSettings)
  const removingLiquidity = useAppSelector($removingPoolsLiquidity)
  const loading = useAppSelector($loadingPools)

  useWatchAddLiquidityDialog()
  useWatchSelectedPool()

  const closeDialog = () => {
    dispatch(toggleDialog({ type: '', pool: null }))
  }

  const renderTransactionsTitle = (display: { xs: string; md: string }) => (
    <Grid item xs={12} md={6} lg={7} component={Box} display={display}>
      <Box display="flex" alignItems="flex-end" height="100%" mt={display.xs === 'block' ? 1 : 0} ml={3}>
        <Typography variant="h4">Transactions</Typography>
      </Box>
    </Grid>
  )

  return (
    <Grid container spacing={2}>
      <AddLiquidityDialog
        open={dialog.type === Dialogs.ADD_LIQUIDITY && liquidityDialog.type !== LiquidityDialogs.CONFIRM_LIQUIDITY}
        onClose={closeDialog}
      />
      <ConfirmLiquidityDialog open={liquidityDialog.type === LiquidityDialogs.CONFIRM_LIQUIDITY} />
      <RemoveLiquidityDialog
        open={dialog.type === Dialogs.REMOVE_LIQUIDITY}
        pool={dialog.pool as WalletPoolsSelector}
        slippageTolerance={tSettings.slippageTolerance}
        onClose={closeDialog}
        showBackdrop={removingLiquidity}
        confirm={() => dispatch(removeLiquidityFromPool())}
      />
      {}
      {Boolean(pool) ? (
        <>
          <Grid item xs={12} md={6} lg={5}>
            <Box display="flex" alignItems="flex-end" ml={3}>
              <LPAvatar size={40} avatar0={pool?.token0LogoURI} avatar1={pool?.token1LogoURI} />
              <Typography variant="h3">
                {pool?.token0.symbol}/{pool?.token1.symbol}
              </Typography>
            </Box>
          </Grid>
          {renderTransactionsTitle({ xs: 'none', md: 'block' })}
          <PoolInfo />
          {renderTransactionsTitle({ xs: 'block', md: 'none' })}
          <PoolTransactionsList />
        </>
      ) : (
        <PoolNotFound loading={loading} />
      )}
    </Grid>
  )
}
