import { Grid, makeStyles, Typography } from '@material-ui/core'
import AllPoolsList from 'modules/pools/components/AllPoolsList'
import LiquiditySwapCardContainer from 'modules/shared/components/LiquiditySwapCardContainer'

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

export const Pools = () => {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h1">All pools</Typography>
      </Grid>
      <LiquiditySwapCardContainer md={12} cardClass={classes.card}>
        <AllPoolsList />
      </LiquiditySwapCardContainer>
    </Grid>
  )
}
