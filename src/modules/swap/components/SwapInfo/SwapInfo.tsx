import { Grid, makeStyles } from '@material-ui/core'
import { RatesInfo, RowInfo } from 'modules/shared/components/LiquiditySwapInfo'
import { useAppSelector } from 'hooks'
import { $swapInfo } from 'modules/swap/selectors'

interface SwapInfoProps {
  withEstimatedTotals?: boolean
}

const useStyles = makeStyles((theme) => ({
  swapFeeContainer: {
    marginTop: theme.spacing(0.75),
  },
}))

export const SwapInfo = ({ withEstimatedTotals }: SwapInfoProps) => {
  const classes = useStyles()
  const { fee, i0Symbol, total, i1Symbol, rate, price, slipTolerance } = useAppSelector($swapInfo)

  return (
    <Grid container>
      <RatesInfo rate={rate} i0Symbol={i0Symbol} i1Symbol={i1Symbol} price={price} />
      <RowInfo
        variant="body2"
        label="Swap Fee"
        value={`${fee} %`}
        className={classes.swapFeeContainer}
        tooltip="Swap fee is redeemed by the platform for each transaction"
      />
      <RowInfo
        variant="body2"
        label="Slippage Tolerance"
        value={`${slipTolerance} %`}
        tooltip="A higher percent of the slippage tolerance allows to complete a faster transaction, yet the less sum will be received to your account. You can manage slippage tolerance in settings"
      />

      {withEstimatedTotals && (
        <RowInfo
          variant="h5"
          label="Estimated Total"
          value={`${total} ${i1Symbol}`}
          tooltip="The minimum total you receive after the fees"
        />
      )}
    </Grid>
  )
}
