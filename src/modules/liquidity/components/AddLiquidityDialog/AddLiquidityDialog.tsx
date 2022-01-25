import { useMemo } from 'react'
import { useAppSelector } from 'hooks'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import { $combinedInput0, $combinedInput1, $confirmingTokenTransaction } from 'modules/liquidity/selectors'
import LiquidityInputs from 'modules/shared/components/LiquiditySwapInputs'
import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { Inputs, useWatchPricesChange, useWatchTokenChange } from 'modules/shared'
import { setAmount } from 'modules/liquidity/slice'
import LiquidityInfo from 'modules/liquidity/components/LiquidityInfo'
import BackdropLoader from 'components/BackdropLoader'
import { useAmountChangeHandler } from 'modules/shared/hooks/useAmountChangeHandler'
import { useLiquidityPrimaryButton } from 'modules/liquidity/hooks/useLiquidityPrimaryButton'

const useStyles = makeStyles((theme) => ({
  addLiqTitle: { marginRight: theme.spacing(1) },
  iconPlus: {
    fontWeight: 'bold',
  },
  mainButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  infoContainer: {
    marginTop: theme.spacing(2),
  },
  poolNotCreatedBox: {
    marginTop: theme.spacing(2),
  },
}))

/**
 * tokens for pool you want to add liquidity must be present in tokens list
 */
export const AddLiquidityDialog = ({ open, onClose }: BaseDialogProps) => {
  const classes = useStyles()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const confirmingTokenTransactions = useAppSelector($confirmingTokenTransaction)
  const inputs = { input0, input1 }

  useWatchTokenChange(input0.token)
  useWatchTokenChange(input1.token)
  useWatchPricesChange(input0, input1, setAmount, Inputs.INPUT_1, true)
  const { i1AmountChange, i0AmountChange } = useAmountChangeHandler(inputs, setAmount, true)
  const { enableToken0Button, enableToken1Button, addLiquidityButton } = useLiquidityPrimaryButton(input0, input1)

  const i0Props = useMemo(
    () => ({
      label: '',
      disallowTokenSelect: true,
      tokenInput: input0,
      onChange: i0AmountChange,
      onMaxClick: () => i0AmountChange(String(inputs.input0.balance)),
    }),
    [input0],
  )
  const i1Props = useMemo(
    () => ({
      label: '',
      disallowTokenSelect: true,
      tokenInput: input1,
      onChange: i1AmountChange,
      onMaxClick: () => i1AmountChange(String(inputs.input1.balance)),
    }),
    [input1],
  )

  return (
    <BaseDialog
      open={open}
      titleElement={
        <Box display="flex" alignItems="center">
          <Typography variant="h4" className={classes.addLiqTitle}>
            Add liquidity to
          </Typography>
          <LPAvatar avatar0={input0.token?.logoURI} size={32} avatar1={input1.token?.logoURI} />
          <Typography variant="h4" className={classes.addLiqTitle}>
            {input0.token?.symbol}/{input1.token?.symbol}
          </Typography>
        </Box>
      }
      onClose={onClose}
    >
      <BackdropLoader open={confirmingTokenTransactions} text="Confirm transaction" />
      <LiquidityInputs
        input0Props={i0Props}
        input1Props={i1Props}
        icon={
          <Icon color="primary" className={classes.iconPlus}>
            add
          </Icon>
        }
      />
      <Grid container>
        <Grid item xs={12} sm={9} className={classes.mainButtonContainer}>
          {enableToken0Button}
          {enableToken1Button}
          {addLiquidityButton}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9} className={classes.infoContainer}>
        <LiquidityInfo editableFees={false} />
      </Grid>
    </BaseDialog>
  )
}
