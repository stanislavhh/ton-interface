import { useAppDispatch, useAppSelector, useRouter } from 'hooks'
import { $loadingMyPoolsList, $poolsDialog, $walletPoolsList } from 'modules/pools/selectors'
import { MY_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'
import { $isConnected } from 'modules/wallet'
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/ListComponents'
import CardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import BaseButton from 'components/BaseButton'
import MyPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/MyPoolsList'
import { AddLiquidityDialog } from 'modules/liquidity/components/AddLiquidityDialog'
import { RemoveLiquidityDialog } from 'modules/pools/components/RemoveLiquidityDialog'
import { Dialogs } from 'modules/pools/enums'
import { toggleDialog } from 'modules/pools/slice'
import { useWatchAddLiquidity } from 'modules/pools/hooks'
import ConfirmLiquidityDialog from 'modules/liquidity/components/ConfirmLiquidityDialog'
import { Dialogs as LiquidityDialogs } from 'modules/liquidity'
import { $dialog } from 'modules/liquidity/selectors'

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

export const MyPools = () => {
  useWatchAddLiquidity()
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)
  const liquidityDialog = useAppSelector($dialog)
  const pools = useAppSelector($walletPoolsList)
  const loading = useAppSelector($loadingMyPoolsList)
  const connected = useAppSelector($isConnected)

  const navigateToLiquidity = () => router.navigate('/liquidity')
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
      <RemoveLiquidityDialog />
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
    </Grid>
  )
}
