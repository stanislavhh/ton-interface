import { Grid, Box, Icon, makeStyles, Typography, CircularProgress } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import BaseTooltip from 'components/BaseTooltip'
import { iconsTransition } from 'helpers/themeHelper'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $swapInfo } from 'modules/swap/selectors'
import { getTokenPrice } from 'modules/layout'

interface SwapInfoProps {
  withEstimatedTotals?: boolean
}

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

export const SwapInfo = ({ withEstimatedTotals }: SwapInfoProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { fee, fromSymbol, total, toSymbol, fromName, toName, rate, price, slipTolerance, loadingPrice } =
    useAppSelector($swapInfo)

  const hide = !fromName || !toName

  const infoSections = {
    'Swap Fee': {
      tooltip: 'Swap fee is redeemed by the platform for each transaction',
      valueEnding: '%',
      typographyVariant: 'body2',
      value: fee,
      className: classes.swapFeeContainer,
    },
    'Slippage Tolerance': {
      tooltip:
        'A higher percent of the slippage tolerance allows to complete a faster transaction, yet the less sum will be received to your account. You can manage slippage tolerance in settings',
      valueEnding: '%',
      value: slipTolerance,
      typographyVariant: 'body2',
      className: '',
    },
    'Estimated Total': {
      tooltip: 'The minimum total you receive after the fees',
      valueEnding: toSymbol,
      value: total,
      typographyVariant: 'h5',
      className: '',
    },
  }

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

  const renderSection = (label: 'Swap Fee' | 'Slippage Tolerance' | 'Estimated Total') => (
    <Grid item xs={12} className={`${classes.rowContainer} ${infoSections[label].className}`}>
      <Typography variant={infoSections[label].typographyVariant as Variant}>
        {label}
        <BaseTooltip title={infoSections[label].tooltip}>
          <Icon color="disabled" className={classes.helpIcon}>
            info_outlined
          </Icon>
        </BaseTooltip>
      </Typography>
      <Typography
        variant={infoSections[label].typographyVariant as Variant}
      >{`${infoSections[label].value} ${infoSections[label].valueEnding}`}</Typography>
    </Grid>
  )

  return (
    <Grid container>
      <Grid item xs={12} className={classes.rowContainer}>
        <Typography variant="body2">Rate</Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          {renderRates()}
        </Box>
      </Grid>
      {renderSection('Swap Fee')}
      {renderSection('Slippage Tolerance')}
      {withEstimatedTotals && renderSection('Estimated Total')}
    </Grid>
  )
}
