import { useAppDispatch, useAppSelector, useRouter } from 'hooks'
import { $loadingMyPoolsList, $poolsDialog, $removingPoolsLiquidity, $walletPoolsList } from 'modules/pools/selectors'
import { MY_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'
import { $isConnected } from 'modules/wallet'
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/ListComponents'
import CardContainer from 'modules/shared/components/CardContainer'
import BaseButton from 'components/BaseButton'
import MyPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/MyPoolsList'
import { AddLiquidityDialog } from 'modules/liquidity/components/AddLiquidityDialog'
import { RemoveLiquidityDialog } from 'modules/liquidity/components/RemoveLiquidityDialog'
import { Dialogs } from 'modules/pools/enums'
import { removeLiquidityFromPool, toggleDialog } from 'modules/pools/slice'
import { useWatchAddLiquidityDialog } from 'modules/pools/hooks'
import ConfirmLiquidityDialog from 'modules/liquidity/components/ConfirmLiquidityDialog'
import { Dialogs as LiquidityDialogs } from 'modules/liquidity'
import { $dialog } from 'modules/liquidity/selectors'
import { WalletPoolsSelector } from 'modules/pools/types'
import { $transactionSettings } from 'modules/layout/selectors'
import { PoolsImg } from 'modules/pools/components/PoolsImg'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'relative',
  },
  card: {
    minHeight: '500px',
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

export const MyPools = () => {
  useWatchAddLiquidityDialog()
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)
  const liquidityDialog = useAppSelector($dialog)
  const pools = useAppSelector($walletPoolsList)
  const loading = useAppSelector($loadingMyPoolsList)
  const connected = useAppSelector($isConnected)
  const tSettings = useAppSelector($transactionSettings)
  const removingLiquidity = useAppSelector($removingPoolsLiquidity)

  const navigateToLiquidity = () => router.navigate('/liquidity')
  const closeDialog = () => {
    dispatch(toggleDialog({ type: '', pool: null }))
  }

  return (
    <Grid container justifyContent="center" className={classes.mainContainer}>
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
      <MyPoolsTitle title="My Pools" md={12} secondaryTitle="All Pools" to="/all-pools" />
      <CardContainer md={12} cardClass={classes.card}>
        {loading ? (
          <CircularProgress size={32} />
        ) : connected && pools.length ? (
          <MyPoolsList
            HeaderComponent={PoolHeader}
            RowComponent={PoolRow}
            pools={pools}
            initialSortOptions={MY_POOLS_INITIAL_OPTIONS.sortOptions}
            initialFilterOptions={MY_POOLS_INITIAL_OPTIONS.filterOptions}
          />
        ) : connected ? (
          <>
            <Typography variant="body2">You don't have pools with liquidity added</Typography>
            <BaseButton
              variant="contained"
              onClick={navigateToLiquidity}
              className={classes.addLiquidityButton}
              size="medium"
              color="primary"
            >
              Add liquidity
            </BaseButton>
          </>
        ) : (
          <Typography variant="body2" className={classes.connectToWallet}>
            Please connect your wallet in order to see the list of your pools
          </Typography>
        )}
      </CardContainer>
      <PoolsImg />
    </Grid>
  )
}
