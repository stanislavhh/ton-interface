import { Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  termsTypo: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'justify',
    display: 'block',
  },
}))
export const ConfirmationTerms = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Typography variant="caption" color="textSecondary" className={classes.termsTypo}>
        By clicking ‘confirm’ I agree to Terms and Conditions and allow TonLaunch to transfer cryptocurrency from my
        electronic wallet.
      </Typography>
    </Grid>
  )
}
