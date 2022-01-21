import { Grid, Box, Icon, makeStyles, Typography, CircularProgress } from '@material-ui/core'
import BaseTooltip from 'components/BaseTooltip'
import { iconsTransition } from 'helpers/themeHelper'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $swapInfo } from 'modules/swap/selectors'
import { getTokenPrice } from '../../../layout'

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  refreshPriceIcon: {
    ...iconsTransition,
    marginLeft: theme.spacing(1),
  },
  swapFeeContainer: {
    marginTop: theme.spacing(0.75),
  },
  helpIcon: {
    fontSize: '20px',
    marginLeft: theme.spacing(1),
  },
  $text: {
    display: 'block',
    textAlign: 'right',
  },
}))

export const SwapInfo = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { fee, fromSymbol, toSymbol, fromName, toName, rate, price, slipTolerance, loadingPrice } =
    useAppSelector($swapInfo)

  const hide = !fromName || !toName

  const refreshPrices = () => {
    dispatch(getTokenPrice(fromName as string))
    dispatch(getTokenPrice(toName as string))
  }

  const renderRates = () => {
    if (loadingPrice) {
      return <CircularProgress size={20} />
    }

    if (hide) {
      return '-'
    }

    return (
      <>
        <Box>
          <Typography variant="body2">{`1 ${fromSymbol} = ${rate} ${toSymbol}`}</Typography>
          <Typography variant="caption" color="textSecondary" className={classes.$text}>
            ≈ ${price}
          </Typography>
        </Box>
        <Icon color="primary" onClick={refreshPrices} className={classes.refreshPriceIcon}>
          cached_sharp
        </Icon>
      </>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.rowContainer}>
        <Typography variant="body2">Rate</Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          {renderRates()}
        </Box>
      </Grid>
      <Grid item xs={12} className={`${classes.rowContainer} ${classes.swapFeeContainer}`}>
        <Typography variant="body2">
          Swap Fee
          <BaseTooltip title="Swap fee is redeemed by the platform for each transaction">
            <Icon color="disabled" className={classes.helpIcon}>
              info_outlined
            </Icon>
          </BaseTooltip>
        </Typography>
        <Typography variant="body2">{fee}%</Typography>
      </Grid>
      <Grid item xs={12} className={classes.rowContainer}>
        <Typography variant="body2">
          Slippage Tolerance
          <BaseTooltip title="A higher percent of the slippage tolerance allows to complete a faster transaction, yet the less sum will be received to your account. You can manage slippage tolerance in settings">
            <Icon color="disabled" className={classes.helpIcon}>
              info_outlined
            </Icon>
          </BaseTooltip>
        </Typography>
        <Typography variant="body2">{slipTolerance}%</Typography>
      </Grid>
    </Grid>
  )
}
