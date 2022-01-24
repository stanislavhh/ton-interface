import { Avatar, Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $confirmingLiquidity, $liquidityInfo } from 'modules/liquidity/selectors'
import { confirmAddLiquidity, setDialog } from 'modules/liquidity/slice'
import { CombinedTokenInput } from 'modules/shared'
import { RatesInfo, RowInfo } from 'modules/shared/components/LiquiditySwapInfo'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import BaseButton from 'components/BaseButton'
import ConfirmationTerms from 'modules/shared/components/ConfirmationTerms'

interface ConfirmLiquidityDialogProps extends Partial<BaseDialogProps> {
  open: boolean
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(2),
  },
  depositContainer: {
    marginBottom: theme.spacing(2),
  },
  receiveContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  flex: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: '32px',
    height: '32px',
  },
  symbol: {
    marginInline: theme.spacing(1),
  },
  price: {
    width: 'max-content',
    position: 'absolute',
    top: '100%',
    right: '0',
  },
  helpIcon: {
    fontSize: '16px',
    marginLeft: theme.spacing(1),
  },
  confirmButton: {
    marginTop: theme.spacing(2),
  },
}))

export const ConfirmLiquidityDialog = (props: ConfirmLiquidityDialogProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { i0, i1, poolFees, poolShare, slipTolerance, rate } = useAppSelector($liquidityInfo)
  const confirmingLiquidity = useAppSelector($confirmingLiquidity)

  // For now i keep it mocked..
  const MOCKED_LP = '1.352'
  const MOCKED_INCOME = ((Number(i0.price) + Number(i1.price)) * 0.01).toFixed(2)

  const renderToken = (input: CombinedTokenInput, className?: string) => (
    <Grid item xs={5} className={`${classes.flex} ${className || ''}`}>
      <Avatar src={input.token?.logoURI} className={classes.avatar} />
      <Typography variant="body2" className={classes.symbol}>
        {input.token?.symbol}
      </Typography>
      <Typography variant="body2" style={{ position: 'relative' }}>
        {input.amount}
        <Typography variant="caption" color="textSecondary" className={classes.price}>
          ≈ ${(Number(i0.price) * Number(i0.amount)).toFixed(2)}
        </Typography>
      </Typography>
    </Grid>
  )

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
        <Grid item xs={12} className={classes.depositContainer}>
          <Typography variant="body2">You deposit</Typography>
        </Grid>
        {renderToken(i0)}
        <Grid item xs={2} className={`${classes.flex} ${classes.justifyCenter}`}>
          <Icon color="primary">add</Icon>
        </Grid>
        {renderToken(i1, classes.justifyEnd)}
        <Grid item xs={12} className={classes.receiveContainer}>
          <Typography variant="body2">You receive</Typography>
        </Grid>
        <Grid item xs={12} className={classes.flex}>
          <LPAvatar avatar0={i0.token?.logoURI} avatar1={i1.token?.logoURI} />
          <Typography variant="body2">{`${i0.token?.symbol}/${i1.token?.symbol} ${MOCKED_LP} LP Token`}</Typography>
        </Grid>
        <Box mt={3} width={1} />
        <RatesInfo i0Symbol={i0.token?.symbol} i1Symbol={i1.token?.symbol} rate={rate} price={i0.price} />
        <RowInfo
          variant="body2"
          label="Share of pool"
          tooltip="Your part in pool"
          value={poolShare ? `${poolShare} %` : '-'}
        />
        <RowInfo
          variant="body2"
          label="Fee tier"
          tooltip="Fee tier is setup automatically based on users choice. You may change it in tiers popup."
          value={`${feeTierToPercentage(poolFees)} %`}
        />
        <RowInfo
          variant="body2"
          label="Est. Daily Income"
          tooltip="Daily income estimated on current liquidity and APR of pool."
          value={`${MOCKED_INCOME} $`}
        />
        <RowInfo
          variant="body2"
          label="Slippage Tolerance"
          value={`${slipTolerance} %`}
          tooltip="A higher percent of the slippage tolerance allows to complete a faster transaction, yet the less sum will be received to your account. You can manage slippage tolerance in settings"
        />
        <RowInfo
          variant="h5"
          label="Minimum received"
          value={`${MOCKED_LP}`}
          tooltip="Minimum received after all transactions will be done."
        />
        <BaseButton
          color="primary"
          size="large"
          fullWidth
          className={classes.confirmButton}
          onClick={() => dispatch(confirmAddLiquidity())}
          variant="contained"
        >
          Confirm
        </BaseButton>
        <ConfirmationTerms />
      </Grid>
    </BaseDialog>
  )
}
