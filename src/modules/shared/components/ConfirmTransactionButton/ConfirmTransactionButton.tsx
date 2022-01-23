import { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core'
import BaseButton, { BaseButtonProps } from 'components/BaseButton'
import ConnectWalletButton from 'modules/wallet/components/ConnectButton'
import { useAppSelector } from 'hooks'
import { $isConnected } from 'modules/wallet'

export interface ConfirmButtonProps extends BaseButtonProps {
  canConfirm?: boolean
  text: string | ReactElement
  confirm: () => void
}

export const ConfirmTransactionButton = (props: ConfirmButtonProps) => {
  const isConnected = useAppSelector($isConnected)

  const { canConfirm, text, confirm, ...rest } = props

  return isConnected ? (
    <BaseButton
      {...rest}
      disabled={!canConfirm}
      variant="contained"
      color="primary"
      size="large"
      onClick={confirm}
      fullWidth
    >
      {text}
    </BaseButton>
  ) : (
    <ConnectWalletButton {...rest} fullWidth size="large" />
  )
}
