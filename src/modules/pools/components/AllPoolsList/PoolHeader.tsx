import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { PoolSearch, PoolSearchProps } from './PoolSearch'

const useStyles = makeStyles((theme) => ({
  poolHeader: {
    paddingInline: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    alignItems: 'center',
  },
  flexCenter: {
    justifyContent: 'center',
  },
}))
export const PoolHeader = (props: PoolSearchProps) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.poolHeader}>
      <Grid xs={7} sm={3} item>
        <PoolSearch {...props} />
      </Grid>
      <Grid sm={1} md={1} display={{ xs: 'none', sm: 'flex' }} className={classes.flexCenter} item component={Box}>
        <Typography variant="caption" color="textSecondary">
          Fee
        </Typography>
      </Grid>
      <Grid sm={3} md={2} display={{ xs: 'none', sm: 'flex' }} item component={Box} className={classes.flexCenter}>
        <Typography variant="caption" color="textSecondary">
          Liquidity
        </Typography>
      </Grid>
      <Grid sm={3} md={2} display={{ xs: 'none', sm: 'flex' }} item component={Box} className={classes.flexCenter}>
        <Typography variant="caption" color="textSecondary">
          Volume 7d
        </Typography>
      </Grid>
      <Grid xs={3} sm={1} md={1} display={{ xs: 'flex' }} item component={Box} className={classes.flexCenter}>
        <Typography variant="caption" color="textSecondary">
          APR
        </Typography>
      </Grid>
    </Grid>
  )
}
