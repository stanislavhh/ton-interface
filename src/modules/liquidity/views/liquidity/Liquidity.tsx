import { Grid, Icon, makeStyles } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'
import { Token, TokensListDialog } from 'modules/shared'
import { ChangeAmountEvent } from 'modules/swap/types'
import { Dialogs } from 'modules/swap/enums'
import { Inputs } from 'modules/shared/enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $combinedInput0, $combinedInput1, $dialog, $selectedDialogToken } from 'modules/liquidity/selectors'
import { $tokensWithBalances } from 'modules/wallet/selectors'
import { $loadingTokens } from 'modules/layout/selectors'

import SwapConfirmDialog from 'modules/swap/components/SwapConfirmDialog'
import { TransactionSettingsGridWrapper } from 'modules/shared/components/TransactionSettings'
import LiquiditySwapCardContainer from 'modules/shared/components/LiquiditySwapCardContainer'
import LiquiditySwapTitle from 'modules/shared/components/LiquiditySwapTitle'
import LiquidityInputs from 'modules/shared/components/LiquiditySwapInputs'

const useStyles = makeStyles((theme) => ({
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

export const Liquidity = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const input0 = useAppSelector($combinedInput0)
  const input1 = useAppSelector($combinedInput1)
  const selectedDialogToken = useAppSelector($selectedDialogToken)
  const tokens = useAppSelector($tokensWithBalances)
  const dialog = useAppSelector($dialog)
  const loadingTokens = useAppSelector($loadingTokens)
  const inputs = { input0, input1 }

  const closeDialog = () => {}

  const onTokenSelect = (token: Token) => {
    const type = dialog.input as Inputs
  }

  const handleAmountChange = ({ type, amount }: ChangeAmountEvent) => {
    const invertedType = type === Inputs.INPUT_0 ? Inputs.INPUT_1 : Inputs.INPUT_0
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
      <LiquiditySwapTitle title="+ Add Liquidity" to="/" secondaryTitle="Swap" />
      <LiquiditySwapCardContainer>
        <TransactionSettingsGridWrapper />
        <LiquidityInputs
          input0={input0}
          input1={input1}
          onAmountChange={handleAmountChange}
          onMaxClick={({ type }) => handleAmountChange({ type, amount: String(inputs[type].balance) })}
          onTokenBtnClick={({ type }) => {}}
          icon={
            <Icon color="primary" onClick={() => {}} className={classes.refreshIcon}>
              cached_sharp
            </Icon>
          }
        />
      </LiquiditySwapCardContainer>
    </Grid>
  )
}
