import { Grid, makeStyles } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $confirmingLiquidity } from 'modules/liquidity/selectors'
import { setDialog } from 'modules/liquidity/slice'

interface AddLiquidityDialogProps extends Partial<BaseDialogProps> {
  open: boolean
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(4),
  },
}))

export const AddLiquidityDialog = (props: AddLiquidityDialogProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const confirmingLiquidity = useAppSelector($confirmingLiquidity)

  return (
    <BaseDialog
      title="Confirm deposit to Liquidity Pool"
      classes={{ paper: classes.dialog }}
      showBackdropLoader={confirmingLiquidity}
      backdropText="Processing the transfer"
      fullWidth
      onClose={() => dispatch(setDialog({ type: '' }))}
      {...props}
    >
      <Grid container className={classes.mainContainer}>
        OK DIALOG
      </Grid>
    </BaseDialog>
  )
}
