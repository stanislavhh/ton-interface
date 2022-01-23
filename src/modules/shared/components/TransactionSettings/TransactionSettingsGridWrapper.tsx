import { Grid, makeStyles } from '@material-ui/core'
import { TransactionSettingsIcon } from './TransactionSettingsIcon'

const useStyles = makeStyles((theme) => ({
  transactionSettingsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export const TransactionSettingsGridWrapper = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.transactionSettingsContainer}>
        <TransactionSettingsIcon />
      </Grid>
    </Grid>
  )
}
