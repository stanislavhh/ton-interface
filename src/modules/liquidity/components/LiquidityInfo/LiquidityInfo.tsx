import { Grid, makeStyles, Typography } from '@material-ui/core'
import { useAppSelector } from 'hooks'
import { $liquidityInfo } from 'modules/liquidity/selectors'
import { RowInfo, RatesInfo } from 'modules/shared/components/LiquiditySwapInfo'
import BaseButton from 'components/BaseButton'
import { FeeTiersPopup } from './FeeTiersPopup'
import { xsButton } from 'helpers/themeHelper'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { usePopoverAnchor } from 'hooks'

interface LiquidityInfoProps {
  editableFees?: boolean
}

const useStyles = makeStyles((theme) => ({
  feesButton: {
    ...xsButton,
    '&.Mui-disabled': {
      background: 'rgba(0, 0, 0, 0.12)',
    },
  },
  dialog: {
    maxWidth: '500px',
  },
  mainContainer: {
    marginTop: theme.spacing(4),
  },
}))

export const LiquidityInfo = ({ editableFees = true }: LiquidityInfoProps) => {
  const classes = useStyles()
  const { i0, i1, poolFees, poolShare, rate } = useAppSelector($liquidityInfo)
  const { anchorEl, close: closePopup, isOpen, setAnchorEl } = usePopoverAnchor()

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
          <BaseButton
            disabled={!editableFees}
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className={classes.feesButton}
          >
            <Typography variant="body2">{feeTierToPercentage(poolFees)} %</Typography>
          </BaseButton>
        ) : (
          '-'
        )}
        <FeeTiersPopup
          poolFee={poolFees}
          open={isOpen}
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
