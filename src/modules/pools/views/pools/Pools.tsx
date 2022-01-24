import { Grid, makeStyles, Typography } from '@material-ui/core'
import PoolsList from 'modules/pools/components/AllPoolsList'
import LiquiditySwapCardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import { useAppSelector } from 'hooks'
import { $poolsWithLogos } from 'modules/pools/selectors'

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

export const Pools = () => {
  const classes = useStyles()
  const pools = useAppSelector($poolsWithLogos)

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h1">All pools</Typography>
      </Grid>
      <LiquiditySwapCardContainer md={12} cardClass={classes.card}>
        <PoolsList pools={pools} />
      </LiquiditySwapCardContainer>
    </Grid>
  )
}
