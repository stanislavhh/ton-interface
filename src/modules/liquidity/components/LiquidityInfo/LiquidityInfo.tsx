import { Grid, makeStyles, Typography } from '@material-ui/core'
import { useAppSelector } from 'hooks'
import { $liquidityInfo } from 'modules/liquidity/selectors'
import { RowInfo, RatesInfo } from 'modules/shared/components/LiquiditySwapInfo'
import BaseButton from 'components/BaseButton'
import { useState } from 'react'
import { FeeTiersPopup } from './FeeTiersPopup'
import { xsButton } from 'helpers/themeHelper'
import { feeTierToPercentage } from 'modules/liquidity/utils'

interface LiquidityInfoProps {}

const useStyles = makeStyles((theme) => ({
  feesButton: {
    ...xsButton,
  },
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(4),
  },
}))

export const LiquidityInfo = (props: LiquidityInfoProps) => {
  const classes = useStyles()
  const { i0, i1, poolFees, poolShare, rate } = useAppSelector($liquidityInfo)
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLSpanElement) | null>(null)

  const open = Boolean(anchorEl)

  const closePopup = () => setAnchorEl(null)

  return (
    <Grid container>
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
      >
        {poolFees ? (
          <BaseButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} className={classes.feesButton}>
            <Typography variant="body2">{feeTierToPercentage(poolFees)} %</Typography>
          </BaseButton>
        ) : (
          '-'
        )}
        <FeeTiersPopup
          poolFee={poolFees}
          open={open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={closePopup}
          anchorEl={anchorEl}
        />
      </RowInfo>
      <RatesInfo rate={rate} i1Symbol={i0.token?.symbol} i0Symbol={i1.token?.symbol} />
    </Grid>
  )
}
