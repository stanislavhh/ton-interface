import { Grid, makeStyles } from '@material-ui/core'
import MyPoolsList from 'modules/pools/components/DataList'
import CardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import MyPoolsTitle from 'modules/shared/components/PageTitileWithLink'
import { PoolHeader, PoolRow } from 'modules/pools/components/MyPoolsList'
import { useAppSelector } from 'hooks'
import { $walletPoolsList } from 'modules/pools/selectors'
import { MY_POOLS_INITIAL_OPTIONS } from 'modules/pools/constants'

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

export const MyPools = () => {
  const classes = useStyles()
  const pools = useAppSelector($walletPoolsList)

  return (
    <Grid container justifyContent="center">
      <MyPoolsTitle title="My Pools" md={12} secondaryTitle="All Pools" to="/all-pools" />
      <CardContainer md={12} cardClass={classes.card}>
        <MyPoolsList
          HeaderComponent={PoolHeader}
          RowComponent={PoolRow}
          pools={pools}
          initialSortOptions={MY_POOLS_INITIAL_OPTIONS.sortOptions}
          initialFilterOptions={MY_POOLS_INITIAL_OPTIONS.filterOptions}
        />
      </CardContainer>
    </Grid>
  )
}
