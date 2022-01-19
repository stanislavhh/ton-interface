import { Button, ButtonProps, Icon, makeStyles, Typography, CircularProgress } from '@material-ui/core'
import BaseTooltip from 'components/BaseTooltip'
import { useSelector } from 'react-redux'
import { $isConnected, $address, $connecting } from 'modules/wallet/selectors'
import { getWalletData } from 'modules/wallet/slice'
import { useAppDispatch } from 'hooks'
import { theme } from '../../../../helpers/themeHelper'

const useStyles = makeStyles((theme) => ({
  buttonContainer: {},
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

export const ConnectButton = (props: ButtonProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const isConnected = useSelector($isConnected)
  const connecting = useSelector($connecting)
  const address = useSelector($address)

  const connectWallet = () => dispatch(getWalletData())

  return (
    <Button
      variant={isConnected ? 'outlined' : 'contained'}
      disabled={isConnected || connecting}
      color="primary"
      size="large"
      onClick={connectWallet}
      {...props}
    >
      {connecting ? (
        <CircularProgress />
      ) : isConnected ? (
        <Typography variant="h3" className={classes.connectionText}>
          Connected: {address}
        </Typography>
      ) : (
        <>
          <Icon className={classes.iconBalance}>account_balance_wallet</Icon>
          Connect Wallet
          <BaseTooltip title="In order to make any blockchain transaction you need to connect a wallet">
            <Icon className={classes.iconInfo}>info_outlined</Icon>
          </BaseTooltip>
        </>
      )}
    </Button>
  )
}
