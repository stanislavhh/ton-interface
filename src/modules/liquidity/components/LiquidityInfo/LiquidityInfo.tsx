import { Grid, makeStyles } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $liquidityInfo } from 'modules/liquidity/selectors'
import { RowInfo } from 'modules/shared/components/LiquiditySwapInfo'

interface LiquidityInfoProps {}

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(4),
  },
}))

export const LiquidityInfo = (props: LiquidityInfoProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const liquidityInfo = useAppSelector($liquidityInfo)

  return (
    <Grid container>
      <RowInfo variant="body2" label="Share of pool" tooltip="Your part in pool" value="0" />
      <RowInfo variant="body2" label="Fee tier" tooltip="" value="5" />
    </Grid>
  )
}
