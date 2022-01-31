import { useMemo } from 'react'
import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
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
import { Dialogs, FEE_TIERS } from 'modules/liquidity/enums'
import { useAppDispatch, useAppSelector, useDispatchOnUnmount } from 'hooks'
import { useWatchFeeChange } from 'modules/liquidity/hooks/useWatchFeeChange'
import { clearState, setAmount, setDialog, setToken, setFees } from 'modules/liquidity/slice'
import { findPoolsBySelectedTokens, getBestPoolByVolume } from 'modules/liquidity/utils'
import {
  $combinedInput0,
  $combinedInput1,
  $confirmingTokenTransaction,
  $dialog,
  $poolByFeeAndSelectedTokens,
  $selectedDialogToken,
} from 'modules/liquidity/selectors'
import { $tokensWithBalances } from 'modules/wallet/selectors'
import { $loadingTokens, $prices } from 'modules/layout/selectors'
import { $poolsList } from 'modules/pools/selectors'

import { TransactionSettingsGridWrapper } from 'modules/shared/components/TransactionSettings'
import LiquiditySwapCardContainer from 'modules/shared/components/CardContainer'
import LiquiditySwapTitle from 'modules/shared/components/PageTitileWithLink'
import LiquidityInputs from 'modules/shared/components/LiquiditySwapInputs'
import ConfirmLiquidityDialog from 'modules/liquidity/components/ConfirmLiquidityDialog'
import LiquidityInfo from 'modules/liquidity/components/LiquidityInfo'
import NotificationBox from 'components/NotificationBox'
import BackdropLoader from 'components/BackdropLoader'
import { useAmountChangeHandler } from 'modules/shared/hooks/useAmountChangeHandler'
import { useLiquidityPrimaryButton } from 'modules/liquidity/hooks'
import { LiquiditySwapImg } from 'modules/shared/components/LiquiditySwapImg'
import { PaperPlaneImg } from 'modules/shared/components/PaperPlaneImg'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'relative',
  },
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

export const Liquidity = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const pools = useAppSelector($poolsList)
  const selectedDialogToken = useAppSelector($selectedDialogToken)
  const poolByFeeAndTokens = useAppSelector($poolByFeeAndSelectedTokens)
  const tokens = useAppSelector($tokensWithBalances)
  const dialog = useAppSelector($dialog)
  const loadingTokens = useAppSelector($loadingTokens)
  const prices = useAppSelector($prices)
  const confirmingTokenTransactions = useAppSelector($confirmingTokenTransaction)
  const inputs = { input0, input1 }
  const poolExists = Boolean(poolByFeeAndTokens)

  useWatchTokenChange(input0.token)
  useWatchTokenChange(input1.token)
  useWatchPricesChange(input0, input1, setAmount, Inputs.INPUT_1, poolExists)
  useWatchFeeChange()
  useDispatchOnUnmount(clearState())
  const { i1AmountChange, i0AmountChange } = useAmountChangeHandler(inputs, setAmount, poolExists)
  const { enableToken0Button, enableToken1Button, addLiquidityButton } = useLiquidityPrimaryButton(input0, input1)

  const closeDialog = () => dispatch(setDialog({ type: '' }))

  const onTokenSelect = (token: Token) => {
    const type = dialog.input as Inputs
    const invertedType = type === Inputs.INPUT_0 ? Inputs.INPUT_1 : Inputs.INPUT_0
    const poolsByTokens = findPoolsBySelectedTokens({ ...inputs[type], token }, inputs[invertedType], pools)

    if (poolsByTokens.length) {
      const bestPool = getBestPoolByVolume(poolsByTokens)
      const scopedInputs = { input0: { ...input0 }, input1: { ...input1 } }

      scopedInputs[type].price = findTokenPrice(prices, token)?.price || '0'

      const t1Amount = convertTokensAmount(scopedInputs.input0, scopedInputs.input1)

      dispatch(setAmount({ type: Inputs.INPUT_1, amount: canSetAmount(Number(t1Amount)) ? t1Amount : '' }))
      dispatch(setFees(bestPool.feeTier as FEE_TIERS))
    }

    dispatch(setToken({ type, token }))
  }

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

  return (
    <Grid container justifyContent="center" className={classes.mainContainer}>
      <BackdropLoader open={confirmingTokenTransactions} text="Confirm transaction" />
      <ConfirmLiquidityDialog open={dialog.type === Dialogs.CONFIRM_LIQUIDITY} />
      <TokensListDialog
        onTokenSelect={onTokenSelect}
        selectedToken={selectedDialogToken}
        open={dialog.type === Dialogs.TOKENS_LIST}
        tokens={tokens}
        onClose={closeDialog}
        loading={loadingTokens}
      />
      <LiquiditySwapTitle title="Add Liquidity" to="/" secondaryTitle="Swap" sm={10} />
      <LiquiditySwapCardContainer sm={10}>
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
          <Grid item xs={12} sm={9}>
            <NotificationBox
              className={classes.poolNotCreatedBox}
              show={Boolean(!poolByFeeAndTokens && input0.token && input1.token)}
              variant="filled"
              severity="info"
            >
              <Box>
                <Typography variant="h5">This pool is not created yet</Typography>
                <Typography variant="body2">
                  To create a pool please set up an exchange rate for the tokens and the fee tier. Process futher when
                  you are ready.{' '}
                </Typography>
              </Box>
            </NotificationBox>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} className={classes.infoContainer}>
          <LiquidityInfo />
        </Grid>
      </LiquiditySwapCardContainer>
      <LiquiditySwapImg />
      <PaperPlaneImg />
    </Grid>
  )
}
