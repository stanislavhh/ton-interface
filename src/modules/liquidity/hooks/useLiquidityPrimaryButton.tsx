import { makeStyles } from '@material-ui/core'
import { CombinedTokenInput } from 'modules/shared'
import BaseButton from 'components/BaseButton'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import { Dialogs } from 'modules/liquidity/enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $loadingPrice } from 'modules/layout/selectors'
import { $isConnected } from 'modules/wallet'
import { $canAddLiquidity, $insufficientBalance } from 'modules/liquidity/selectors'
import { allowTokenTransaction, setDialog } from 'modules/liquidity/slice'

const useStyles = makeStyles((theme) => ({
  enableTokenButton: {
    flexGrow: 1,
    marginInline: theme.spacing(1),
  },
}))

export const useLiquidityPrimaryButton = (input0: CombinedTokenInput, input1: CombinedTokenInput) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const loadingPrice = useAppSelector($loadingPrice)
  const isConnected = useAppSelector($isConnected)
  const canAddLiquidity = useAppSelector($canAddLiquidity)
  const insufficientBalance = useAppSelector($insufficientBalance)

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

  return {
    enableToken0Button,
    enableToken1Button,
    addLiquidityButton,
  }
}
