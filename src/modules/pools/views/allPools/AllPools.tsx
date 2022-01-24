import { Grid, makeStyles } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/DataList'
import CardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import AllPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/AllPoolsList'
import { useAppSelector } from 'hooks'
import { $poolsSelector } from 'modules/pools/selectors'
import { ALL_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

export const AllPools = () => {
  const classes = useStyles()
  const pools = useAppSelector($poolsSelector)

  return (
    <Grid container justifyContent="center">
      <AllPoolsTitle title="All Pools" md={12} secondaryTitle="My Pools" to="/my-pools" />
      <CardContainer md={12} cardClass={classes.card}>
        <MyPoolsList
          HeaderComponent={PoolHeader}
          RowComponent={PoolRow}
          pools={pools}
          initialSortOptions={ALL_POOLS_INITIAL_OPTIONS.sortOptions}
          initialFilterOptions={ALL_POOLS_INITIAL_OPTIONS.filterOptions}
        />
      </CardContainer>
    </Grid>
  )
}
