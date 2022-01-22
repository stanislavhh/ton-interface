import { useCallback, useMemo } from 'react'
import { Grid, Icon, makeStyles } from '@material-ui/core'
import {
  canSetAmount,
  CombinedTokenInput,
  convertTokensAmount,
  findTokenPrice,
  Inputs,
  InputType,
  Token,
  TokensListDialog,
  useWatchPricesChange,
  useWatchTokenChange,
} from 'modules/shared'
import { Dialogs } from 'modules/liquidity/enums'
import { useAppDispatch, useAppSelector, useDispatchOnUnmount } from 'hooks'
import { clearState, setAmount, setDialog, setToken, allowTokenTransaction } from 'modules/liquidity/slice'
import {
  $canAddLiquidity,
  $combinedInput0,
  $combinedInput1,
  $confirmingTokenTransaction,
  $dialog,
  $insufficientBalance,
  $poolByFeeAndSelectedTokens,
  $selectedDialogToken,
} from 'modules/liquidity/selectors'
import { $isConnected, $tokensWithBalances } from 'modules/wallet/selectors'
import { $loadingPrice, $loadingTokens, $prices } from 'modules/layout/selectors'

import { TransactionSettingsGridWrapper } from 'modules/shared/components/TransactionSettings'
import LiquiditySwapCardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import LiquiditySwapTitle from 'modules/shared/components/LiquiditySwapTitle'
import LiquidityInputs from 'modules/shared/components/LiquiditySwapInputs'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import AddLiquidityDialog from 'modules/liquidity/components/AddLiquidityDialog'
import LiquidityInfo from 'modules/liquidity/components/LiquidityInfo'
import BaseButton from 'components/BaseButton'
import BackdropLoader from 'components/BackdropLoader'

const useStyles = makeStyles((theme) => ({
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
  confirmButton: {
    minHeight: '48px',
  },
}))

export const Liquidity = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const selectedDialogToken = useAppSelector($selectedDialogToken)
  const poolByFeeAndTokens = useAppSelector($poolByFeeAndSelectedTokens)
  const tokens = useAppSelector($tokensWithBalances)
  const dialog = useAppSelector($dialog)
  const loadingTokens = useAppSelector($loadingTokens)
  const loadingPrice = useAppSelector($loadingPrice)
  const isConnected = useAppSelector($isConnected)
  const canAddLiquidity = useAppSelector($canAddLiquidity)
  const insufficientBalance = useAppSelector($insufficientBalance)
  const prices = useAppSelector($prices)
  const confirmingTokenTransactions = useAppSelector($confirmingTokenTransaction)

  const inputs = { input0, input1 }

  useWatchTokenChange(input0.token)
  useWatchTokenChange(input1.token)
  useWatchPricesChange(input0, input1, setAmount, Inputs.INPUT_1, Boolean(poolByFeeAndTokens))
  useDispatchOnUnmount(clearState())

  const closeDialog = () => dispatch(setDialog({ type: '' }))

  const onTokenSelect = (token: Token) => {
    const type = dialog.input as Inputs

    if (poolByFeeAndTokens) {
      const scopedInputs = { input0: { ...input0 }, input1: { ...input1 } }

      scopedInputs[type].price = findTokenPrice(prices, token)?.price || '0'

      const t1Amount = convertTokensAmount(scopedInputs.input0, scopedInputs.input1)

      dispatch(setAmount({ type: Inputs.INPUT_1, amount: canSetAmount(Number(t1Amount)) ? t1Amount : '' }))
    }

    dispatch(setToken({ type, token }))
  }

  const handleAmountChange = (type: InputType) => (amount: string) => {
    dispatch(setAmount({ type, amount }))

    if (poolByFeeAndTokens) {
      const invertedType = type === Inputs.INPUT_0 ? Inputs.INPUT_1 : Inputs.INPUT_0
      const t0 = inputs[type]
      const t1 = inputs[invertedType]

      const t1Amount = convertTokensAmount({ ...t0, amount: amount || t0.amount }, t1)

      if (canSetAmount(Number(t1Amount))) {
        dispatch(setAmount({ type: invertedType, amount: t1Amount }))
      }
    }
  }

  const i0AmountChange = useCallback(handleAmountChange(Inputs.INPUT_0), [inputs])
  const i1AmountChange = useCallback(handleAmountChange(Inputs.INPUT_1), [inputs])

  const i0Props = useMemo(
    () => ({
      tokenInput: input0,
      label: 'First Token',
      onChange: i0AmountChange,
      onBtnClick: () => dispatch(setDialog({ input: Inputs.INPUT_0, type: Dialogs.TOKENS_LIST })),
      onMaxClick: () => i0AmountChange(String(inputs.input0.balance)),
    }),
    [input0],
  )
  const i1Props = useMemo(
    () => ({
      tokenInput: input1,
      label: 'Second Token',
      onChange: i1AmountChange,
      onBtnClick: () => dispatch(setDialog({ input: Inputs.INPUT_1, type: Dialogs.TOKENS_LIST })),
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
          className={`${classes.confirmButton} ${classes.enableTokenButton}`}
          color="primary"
          variant="contained"
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
        className={classes.confirmButton}
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
    <Grid container justifyContent="center">
      <BackdropLoader open={confirmingTokenTransactions} text="Confirm this transaction in your wallet" />
      <AddLiquidityDialog open={dialog.type === Dialogs.CONFIRM_LIQUIDITY} />
      <TokensListDialog
        onTokenSelect={onTokenSelect}
        selectedToken={selectedDialogToken}
        open={dialog.type === Dialogs.TOKENS_LIST}
        tokens={tokens}
        onClose={closeDialog}
        loading={loadingTokens}
      />
      <Grid item md={1} />
      <LiquiditySwapTitle title="+ Add Liquidity" to="/" secondaryTitle="Swap" />
      <LiquiditySwapCardContainer>
        <TransactionSettingsGridWrapper />
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
          <LiquidityInfo />
        </Grid>
      </LiquiditySwapCardContainer>
    </Grid>
  )
}
