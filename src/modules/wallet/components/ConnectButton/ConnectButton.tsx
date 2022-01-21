import { Icon, makeStyles, Typography } from '@material-ui/core'
import BaseTooltip from 'components/BaseTooltip'
import BaseButton, { BaseButtonProps } from 'components/BaseButton'
import { useSelector } from 'react-redux'
import { $isConnected, $selectedWToken, $connecting } from 'modules/wallet/selectors'
import { getWalletData } from 'modules/wallet/slice'
import { useAppDispatch } from 'hooks'

const useStyles = makeStyles((theme) => ({
  buttonConnect: {
    minHeight: '48px',
  },
  iconBalance: {
    marginRight: theme.spacing(1),
  },
  iconInfo: {
    position: 'absolute',
    right: theme.spacing(2),
    fontSize: '16px',
    marginLeft: theme.spacing(4),
  },
  connectionText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'pre',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
}))

export const ConnectButton = (props: BaseButtonProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const isConnected = useSelector($isConnected)
  const connecting = useSelector($connecting)
  const wToken = useSelector($selectedWToken)
  const { className, ...rest } = props

  const connectWallet = () => dispatch(getWalletData())

  return (
    <BaseButton
      variant={isConnected ? 'outlined' : 'contained'}
      disabled={isConnected || connecting}
      color="primary"
      size="large"
      onClick={connectWallet}
      loading={connecting}
      className={`${classes.buttonConnect} ${className || ''}`}
      {...rest}
    >
      {isConnected ? (
        <Typography variant="h3" className={classes.connectionText}>
          Connected: {wToken?.address}
        </Typography>
      ) : (
        <>
          <Icon className={classes.iconBalance}>account_balance_wallet</Icon>
          Connect Wallet
          <BaseTooltip title="In order to make any blockchain transaction you need to connect to a wallet">
            <Icon className={classes.iconInfo}>info_outlined</Icon>
          </BaseTooltip>
        </>
      )}
    </BaseButton>
  )
}
