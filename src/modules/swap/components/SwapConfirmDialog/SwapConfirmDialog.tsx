import { Grid, Icon, Avatar, Typography, makeStyles } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $combinedInput0, $combinedInput1, $confirmingTransaction } from 'modules/swap/selectors'
import { sendTransaction } from 'modules/swap/slice'
import { Token } from 'modules/shared'
import SwapInfo from 'modules/swap/components/SwapInfo'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'

interface SwapConfirmDialogProps extends Partial<BaseDialogProps> {
  open: boolean
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(4),
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    marginBottom: theme.spacing(3),
  },
  swapInfoContainer: {
    marginTop: theme.spacing(5),
  },
  tokenIcon: {
    marginRight: theme.spacing(1.5),
  },
  confirmContainer: {
    marginBlock: theme.spacing(2),
  },
  termsTypo: {
    marginBottom: theme.spacing(1),
    textAlign: 'justify',
    display: 'block',
  },
}))

export const SwapConfirmDialog = (props: SwapConfirmDialogProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const i0 = useAppSelector($combinedInput0)
  const i1 = useAppSelector($combinedInput1)
  const confirming = useAppSelector($confirmingTransaction)

  const renderAmount = (amount: string | null) => (
    <Grid item xs={4} className={`${classes.flexContainer} ${classes.amountContainer}`}>
      <Typography variant="body1">{amount}</Typography>
    </Grid>
  )

  const renderToken = (token: Token) => (
    <Grid item xs={4} className={classes.flexContainer}>
      <Avatar src={token?.logoURI} className={classes.tokenIcon} />
      <Typography variant="body1">{token?.symbol}</Typography>
    </Grid>
  )

  return (
    <BaseDialog
      title="Confirm Swap"
      showBackdropLoader={confirming}
      backdropText={'Sending transaction'}
      fullWidth
      classes={{ paper: classes.dialog }}
      {...props}
    >
      <Grid container className={classes.mainContainer}>
        <Grid item xs={1} />
        {renderAmount(i0.amount)}
        <Grid item xs={2} />
        {renderAmount(i1.amount)}
        <Grid item xs={1} />
        <Grid item xs={1} />
        {renderToken(i0.token as Token)}
        <Grid item xs={2} className={classes.flexContainer}>
          <Icon color="primary">forward</Icon>
        </Grid>
        {renderToken(i1.token as Token)}
        <Grid item xs={1} />

        <Grid item xs={12} className={classes.swapInfoContainer}>
          <SwapInfo withEstimatedTotals />
        </Grid>

        <Grid item xs={12} className={classes.confirmContainer}>
          <ConfirmTransactionButton text="Confirm" canConfirm confirm={() => dispatch(sendTransaction({ i0, i1 }))} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary" className={classes.termsTypo}>
            By clicking ‘confirm’ I agree to Terms and Conditions and allow TonLaunch to transfer cryptocurrency from my
            electronic wallet.
          </Typography>
        </Grid>
      </Grid>
    </BaseDialog>
  )
}
