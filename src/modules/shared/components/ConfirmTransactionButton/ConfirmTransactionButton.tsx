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

const useStyles = makeStyles((theme) => ({
  confirmButton: {
    minHeight: '48px',
  },
}))

export const ConfirmTransactionButton = (props: ConfirmButtonProps) => {
  const classes = useStyles()
  const isConnected = useAppSelector($isConnected)

  const { canConfirm, text, confirm, className, ...rest } = props

  return isConnected ? (
    <BaseButton
      {...rest}
      className={`${classes.confirmButton} ${className || ''}`}
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
    <ConnectWalletButton {...rest} className={`${classes.confirmButton} ${className || ''}`} fullWidth size="large" />
  )
}
