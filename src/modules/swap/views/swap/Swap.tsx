import { useMemo } from 'react'
import { Grid, Icon, makeStyles } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'
import {
  canSetAmount,
  convertTokensAmount,
  findTokenPrice,
  Inputs,
  Token,
  TokensListDialog,
  useWatchPricesChange,
  useWatchTokenChange,
} from 'modules/shared'
import { Dialogs } from 'modules/swap/enums'
import { useAppDispatch, useAppSelector, useDispatchOnUnmount } from 'hooks'
import { clearState, setAmount, setDialog, setToken, swapInputs } from 'modules/swap/slice'
import {
  $canSwap,
  $combinedInput0,
  $combinedInput1,
  $dialog,
  $insufficientBalance,
  $selectedDialogToken,
} from 'modules/swap/selectors'
import { $tokensWithBalances } from 'modules/wallet/selectors'
import { $loadingTokens, $prices } from 'modules/layout/selectors'
import SwapInputs from 'modules/shared/components/LiquiditySwapInputs'
import SwapInfo from 'modules/swap/components/SwapInfo'
import SwapConfirmDialog from 'modules/swap/components/SwapConfirmDialog'
import { TransactionSettingsGridWrapper } from 'modules/shared/components/TransactionSettings'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import LiquiditySwapCardContainer from 'modules/shared/components/CardContainer'
import LiquiditySwapTitle from 'modules/shared/components/PageTitileWithLink'
import { useAmountChangeHandler } from 'modules/shared/hooks'

const useStyles = makeStyles((theme) => ({
  refreshIcon: {
    fontWeight: 'bold',
    ...iconsTransition,
  },
  mainButtonContainer: {
    marginTop: theme.spacing(2),
  },
  infoContainer: {
    marginTop: theme.spacing(2),
  },
}))

export const Swap = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const selectedDialogToken = useAppSelector($selectedDialogToken)
  const tokens = useAppSelector($tokensWithBalances)
  const dialog = useAppSelector($dialog)
  const loadingTokens = useAppSelector($loadingTokens)
  const insufficientBalance = useAppSelector($insufficientBalance)
  const canSwap = useAppSelector($canSwap)
  const prices = useAppSelector($prices)
  const inputs = { input0, input1 }

  useWatchTokenChange(input0.token)
  useWatchTokenChange(input1.token)
  useWatchPricesChange(input0, input1, setAmount, Inputs.INPUT_1)
  useDispatchOnUnmount(clearState())
  const { i1AmountChange, i0AmountChange } = useAmountChangeHandler(inputs, setAmount, true)

  const closeDialog = () => dispatch(setDialog({ type: '' }))

  const onTokenSelect = (token: Token) => {
    const type = dialog.input as Inputs
    const scopedInputs = { input0: { ...input0 }, input1: { ...input1 } }

    scopedInputs[type].price = findTokenPrice(prices, token)?.price || '0'

    const t1Amount = convertTokensAmount(scopedInputs.input0, scopedInputs.input1)

    dispatch(setAmount({ type: Inputs.INPUT_1, amount: canSetAmount(Number(t1Amount)) ? t1Amount : '' }))
    dispatch(setToken({ type, token }))
  }

  const i0Props = useMemo(
    () => ({
      tokenInput: input0,
      label: 'From',
      onChange: i0AmountChange,
      onBtnClick: () => dispatch(setDialog({ input: Inputs.INPUT_0, type: Dialogs.TOKENS_LIST })),
      onMaxClick: () => i0AmountChange(String(inputs.input0.balance)),
    }),
    [input0],
  )
  const i1Props = useMemo(
    () => ({
      tokenInput: input1,
      label: 'To',
      onChange: i1AmountChange,
      withMax: false,
      onBtnClick: () => dispatch(setDialog({ input: Inputs.INPUT_1, type: Dialogs.TOKENS_LIST })),
      onMaxClick: () => i0AmountChange(String(inputs.input1.balance)),
    }),
    [input1],
  )

  return (
    <Grid container justifyContent="center">
      <SwapConfirmDialog onClose={closeDialog} open={dialog.type === Dialogs.SWAP_CONFIRM} />
      <TokensListDialog
        onTokenSelect={onTokenSelect}
        selectedToken={selectedDialogToken}
        open={dialog.type === Dialogs.TOKENS_LIST}
        tokens={tokens}
        onClose={closeDialog}
        loading={loadingTokens}
      />
      <LiquiditySwapTitle title="Swap" to="/liquidity" sm={10} secondaryTitle="Add Liquidity" />
      <LiquiditySwapCardContainer sm={10}>
        <TransactionSettingsGridWrapper />
        <SwapInputs
          input0Props={i0Props}
          input1Props={i1Props}
          icon={
            <Icon color="primary" onClick={() => dispatch(swapInputs())} className={classes.refreshIcon}>
              cached_sharp
            </Icon>
          }
        />
        <Grid container>
          <Grid item xs={12} sm={9} className={classes.mainButtonContainer}>
            <ConfirmTransactionButton
              canConfirm={canSwap}
              text={!insufficientBalance ? 'Swap' : 'Insufficient Balance'}
              confirm={() => dispatch(setDialog({ type: Dialogs.SWAP_CONFIRM }))}
            />
          </Grid>
          <Grid item xs={12} sm={9} className={classes.infoContainer}>
            <SwapInfo />
          </Grid>
        </Grid>
      </LiquiditySwapCardContainer>
    </Grid>
  )
}
