import { useAppDispatch, useAppSelector } from 'hooks'
import { $poolsDialog, $removingPoolsLiquidity, selectedPoolById } from 'modules/pools/selectors'
import { $isConnected } from 'modules/wallet'
import { Grid, makeStyles } from '@material-ui/core'
import CardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
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

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  connectToWallet: {
    textAlign: 'center',
    width: '75%',
  },
  addLiquidityButton: {
    marginTop: theme.spacing(1),
    paddingInline: theme.spacing(6),
  },
}))

export const Pool = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)
  const liquidityDialog = useAppSelector($dialog)
  const pool = useAppSelector(selectedPoolById)
  const connected = useAppSelector($isConnected)
  const tSettings = useAppSelector($transactionSettings)
  const removingLiquidity = useAppSelector($removingPoolsLiquidity)

  useWatchAddLiquidityDialog()
  useWatchSelectedPool()

  const closeDialog = () => {
    dispatch(toggleDialog({ type: '', pool: null }))
  }

  return (
    <Grid container justifyContent="center">
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
      <CardContainer md={12} cardClass={classes.card}>
        Ok
      </CardContainer>
    </Grid>
  )
}
