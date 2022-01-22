import { Grid, Icon, makeStyles } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'
import { Token, TokensListDialog } from 'modules/shared'
import { ChangeAmountEvent } from 'modules/swap/types'
import { Dialogs, Inputs } from 'modules/swap/enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useWatchPricesChange, useWatchTokenChange } from 'modules/swap/hooks'
import { convertTokensAmount, getTokenPrice } from 'modules/swap//utils'
import { setAmount, setDialog, setToken, swapInputs } from 'modules/swap/slice'
import {
  $canSwap,
  $combinedInputFrom,
  $combinedInputTo,
  $dialog,
  $insufficientBalance,
  $selectedDialogToken,
} from 'modules/swap/selectors'
import { $tokensWithBalances } from 'modules/wallet/selectors'
import { $loadingTokens, $prices } from 'modules/layout/selectors'
import SwapInputs from 'modules/swap/components/SwapInputs'
import SwapInfo from 'modules/swap/components/SwapInfo'
import SwapConfirmDialog from 'modules/swap/components/SwapConfirmDialog'
import { TransactionSettingsGridWrapper } from 'modules/shared/components/TransactionSettings'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import LiquiditySwapCardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import LiquiditySwapTitle from 'modules/shared/components/LiquiditySwapTitle'

const useStyles = makeStyles((theme) => ({
  transactionSettingsContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  refreshIcon: {
    fontWeight: 'bold',
    ...iconsTransition,
  },
  mainButtonContainer: {
    marginTop: theme.spacing(2),
  },
  infoContainer: {
    marginTop: theme.spacing(3),
  },
  swapButton: {
    minHeight: '48px',
  },
}))

export const Swap = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const inputFrom = useAppSelector($combinedInputFrom)
  const inputTo = useAppSelector($combinedInputTo)
  const selectedDialogToken = useAppSelector($selectedDialogToken)
  const tokens = useAppSelector($tokensWithBalances)
  const dialog = useAppSelector($dialog)
  const loadingTokens = useAppSelector($loadingTokens)
  const insufficientBalance = useAppSelector($insufficientBalance)
  const canSwap = useAppSelector($canSwap)
  const prices = useAppSelector($prices)
  const inputs = { inputFrom, inputTo }

  useWatchTokenChange(inputFrom.token)
  useWatchTokenChange(inputTo.token)
  useWatchPricesChange()

  const closeDialog = () => dispatch(setDialog({ type: '' }))

  const onTokenSelect = (token: Token) => {
    const type = dialog.input as Inputs
    const iFrom = { ...inputFrom }
    const iTo = { ...inputTo }
    const price = getTokenPrice(prices, token)?.price || '0'

    if (type === Inputs.INPUT_FROM) {
      iFrom.price = price
    } else {
      iTo.price = price
    }

    dispatch(setAmount({ type: Inputs.INPUT_TO, amount: convertTokensAmount(iFrom, iTo) }))
    dispatch(setToken({ type, token }))
  }

  const handleAmountChange = ({ type, amount }: ChangeAmountEvent) => {
    const invertedType = type === Inputs.INPUT_FROM ? Inputs.INPUT_TO : Inputs.INPUT_FROM
    const t1 = inputs[type]
    const t2 = inputs[invertedType]
    const t2Amount = convertTokensAmount({ ...t1, amount: amount || t1.amount }, t2)

    dispatch(setAmount({ type, amount }))
    dispatch(setAmount({ type: invertedType, amount: String(t2Amount) }))
  }

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
      <Grid item md={1} />
      <LiquiditySwapTitle title="Swap" to="/liquidity" secondaryTitle="+ Add Liquidity" />
      <LiquiditySwapCardContainer>
        <TransactionSettingsGridWrapper />
        <SwapInputs
          fromInput={inputFrom}
          toInput={inputTo}
          onAmountChange={handleAmountChange}
          onMaxClick={({ type }) => handleAmountChange({ type, amount: String(inputs[type].balance) })}
          onTokenBtnClick={({ type }) => dispatch(setDialog({ input: type, type: Dialogs.TOKENS_LIST }))}
          icon={
            <Icon color="primary" onClick={() => dispatch(swapInputs())} className={classes.refreshIcon}>
              cached_sharp
            </Icon>
          }
        />
        <Grid container>
          <Grid item xs={12} sm={9} className={classes.mainButtonContainer}>
            <ConfirmTransactionButton
              className={classes.swapButton}
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
