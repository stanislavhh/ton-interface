import BasePopover, { BasePopoverProps } from 'components/BasePopover'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import BaseTooltip from 'components/BaseTooltip'
import { FEE_TIERS } from 'modules/liquidity/enums'
import BaseButton from 'components/BaseButton'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { setFees } from 'modules/liquidity/slice'
import { COLOR_PRIMARY, COLOR_WHITE, xsButton } from 'helpers/themeHelper'
import { useAppDispatch } from 'hooks'

export interface FeeTiersPopupProps extends BasePopoverProps {
  poolFee: FEE_TIERS | null
  onClose: () => void
}

const useStyles = makeStyles((theme) => ({
  feesButton: {
    ...xsButton,
  },
  selectedFeesButton: {
    outline: '1px solid rgba(0,0,0,0.07)',
    background: 'none',
  },
  feesText: {
    fontWeight: 300,
  },
  selectYourPlan: {
    marginRight: theme.spacing(1),
  },
}))

export const FeeTiersPopup = (props: FeeTiersPopupProps) => {
  const { poolFee, onClose, ...rest } = props
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const poolFeeView = feeTierToPercentage(poolFee)
  return (
    <BasePopover {...rest} onClick={onClose}>
      <Box p={2}>
        <Box display="flex">
          <Typography variant="body2" className={classes.selectYourPlan}>
            Select your plan
          </Typography>
          <BaseTooltip title="Choose the best matching plan of fees that will be paid by traders to liquidity pool providers for each completed operation. Please note, the higher fee implies a higher profit per transaction and a less number of transactions which leads to lower profits. High fee is recommended for unique pairs whilst overage and low fees are recommended for popular and the most popular pairs respectively. ">
            <Icon fontSize="small">help_outline</Icon>
          </BaseTooltip>
        </Box>
        <Box display="flex" mt={2}>
          {Object.values(FEE_TIERS).map((fee) => {
            const f = feeTierToPercentage(fee)
            return (
              <Box marginRight={1} key={fee}>
                <BaseButton
                  size="small"
                  className={`${classes.feesButton} ${f === poolFeeView ? classes.selectedFeesButton : ''}`}
                  onClick={() => {
                    dispatch(setFees(fee))
                    onClose()
                  }}
                >
                  <Typography variant="caption" className={classes.feesText}>
                    {f} %
                  </Typography>
                </BaseButton>
              </Box>
            )
          })}
        </Box>
      </Box>
    </BasePopover>
  )
}
