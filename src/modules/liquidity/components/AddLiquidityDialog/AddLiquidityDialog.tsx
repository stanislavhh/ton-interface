import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import {
  $canAddLiquidity,
  $combinedInput0,
  $combinedInput1,
  $confirmingTokenTransaction,
  $insufficientBalance,
} from 'modules/liquidity/selectors'
import LiquidityInputs from 'modules/shared/components/LiquiditySwapInputs'
import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import LPAvatar from 'modules/shared/components/LPAvatar'
import {
  canSetAmount,
  CombinedTokenInput,
  convertTokensAmount,
  Inputs,
  InputType,
  useWatchPricesChange,
  useWatchTokenChange,
} from 'modules/shared'
import { allowTokenTransaction, setAmount, setDialog } from 'modules/liquidity/slice'
import LiquidityInfo from 'modules/liquidity/components/LiquidityInfo'
import BaseButton from 'components/BaseButton'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import { Dialogs } from 'modules/liquidity/enums'
import { $loadingPrice } from 'modules/layout/selectors'
import { $isConnected } from 'modules/wallet'
import BackdropLoader from 'components/BackdropLoader'

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
  enableTokenButton: {
    flexGrow: 1,
    marginInline: theme.spacing(1),
  },

  poolNotCreatedBox: {
    marginTop: theme.spacing(2),
  },
}))

/**
 * tokens for pool you want to add liquidity must be present in tokens list
 */
export const AddLiquidityDialog = ({ open, onClose }: BaseDialogProps) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const loadingPrice = useAppSelector($loadingPrice)
  const isConnected = useAppSelector($isConnected)
  const canAddLiquidity = useAppSelector($canAddLiquidity)
  const insufficientBalance = useAppSelector($insufficientBalance)
  const confirmingTokenTransactions = useAppSelector($confirmingTokenTransaction)

  const inputs = { input0, input1 }
  useWatchTokenChange(input0.token)
  useWatchTokenChange(input1.token)
  useWatchPricesChange(input0, input1, setAmount, Inputs.INPUT_1, true)

  const handleAmountChange = (type: InputType) => (amount: string) => {
    dispatch(setAmount({ type, amount }))

    const invertedType = type === Inputs.INPUT_0 ? Inputs.INPUT_1 : Inputs.INPUT_0
    const t0 = inputs[type]
    const t1 = inputs[invertedType]

    const t1Amount = convertTokensAmount({ ...t0, amount: amount || t0.amount }, t1)

    if (canSetAmount(Number(t1Amount))) {
      dispatch(setAmount({ type: invertedType, amount: t1Amount }))
    }
  }

  const i0AmountChange = useCallback(handleAmountChange(Inputs.INPUT_0), [inputs])
  const i1AmountChange = useCallback(handleAmountChange(Inputs.INPUT_1), [inputs])

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

  const renderAllowTokenButton = (input: CombinedTokenInput, otherHasPermission: boolean) => {
    const shouldRenderAllowTokenButton =
      isConnected &&
      !input.hasPermission &&
      input0.token &&
      input1.token &&
      input0.amount &&
      input1.amount &&
      !insufficientBalance

    if (shouldRenderAllowTokenButton) {
      return (
        <BaseButton
          loading={loadingPrice}
          onClick={() => dispatch(allowTokenTransaction({ input, otherHasPermission }))}
          className={`${classes.enableTokenButton}`}
          color="primary"
          variant="contained"
          size="large"
        >
          Allow {input.token?.symbol}
        </BaseButton>
      )
    }

    return null
  }

  const renderAddLiquidityButton = () => {
    let text = ''
    if (canAddLiquidity) {
      text = 'Add Liquidity'
    } else if (!input0.token || !input1.token) {
      text = 'Select Tokens'
    } else if (!input0.amount || !input1.amount) {
      text = 'Enter Amount'
    } else if (insufficientBalance) {
      text = 'Insufficient Balance'
    }

    return (
      <ConfirmTransactionButton
        loading={loadingPrice}
        canConfirm={canAddLiquidity}
        text={text}
        confirm={() => dispatch(setDialog({ type: Dialogs.CONFIRM_LIQUIDITY }))}
      />
    )
  }

  const enableToken0Button = renderAllowTokenButton(input0, input1.hasPermission)
  const enableToken1Button = renderAllowTokenButton(input1, input0.hasPermission)
  const addLiquidityButton = enableToken0Button || enableToken1Button ? null : renderAddLiquidityButton()

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
