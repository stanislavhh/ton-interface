import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/ListComponents'
import CardContainer from 'modules/shared/components/CardContainer'
import AllPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/AllPoolsList'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $loadingPools, $poolsDialog, $poolsSelector } from 'modules/pools/selectors'
import { ALL_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'
import { AddLiquidityDialog } from 'modules/liquidity/components/AddLiquidityDialog'
import ConfirmLiquidityDialog from 'modules/liquidity/components/ConfirmLiquidityDialog'
import { toggleDialog } from 'modules/pools/slice'
import { Dialogs } from 'modules/pools/enums'
import { Dialogs as LiquidityDialogs } from 'modules/liquidity/enums'
import { useWatchAddLiquidityDialog } from 'modules/pools/hooks'
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
}))

export const AllPools = () => {
  useWatchAddLiquidityDialog()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const pools = useAppSelector($poolsSelector)
  const dialog = useAppSelector($poolsDialog)
  const liquidityDialog = useAppSelector($dialog)
  const loading = useAppSelector($loadingPools)

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
      <AllPoolsTitle title="All Pools" md={12} secondaryTitle="My Pools" to="/my-pools" />
      <CardContainer md={12} cardClass={classes.card}>
        {loading ? (
          <CircularProgress size={32} />
        ) : (
          <MyPoolsList
            HeaderComponent={PoolHeader}
            RowComponent={PoolRow}
            pools={pools}
            initialSortOptions={ALL_POOLS_INITIAL_OPTIONS.sortOptions}
            initialFilterOptions={ALL_POOLS_INITIAL_OPTIONS.filterOptions}
          />
        )}
      </CardContainer>
    </Grid>
  )
}
