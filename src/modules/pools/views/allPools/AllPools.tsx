import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/ListComponents'
import CardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import AllPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/AllPoolsList'
import { useAppSelector } from 'hooks'
import { $loadingPools, $poolsSelector } from 'modules/pools/selectors'
import { ALL_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'
import { AddLiquidityDialog } from 'modules/pools/components/AddLiquidityDialog'
import { RemoveLiquidityDialog } from 'modules/pools/components/RemoveLiquidityDialog'

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
  const classes = useStyles()
  const pools = useAppSelector($poolsSelector)
  const loading = useAppSelector($loadingPools)

  return (
    <Grid container justifyContent="center">
      <AddLiquidityDialog />
      <RemoveLiquidityDialog />
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
