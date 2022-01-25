import { Icon, makeStyles, MenuItem, Typography } from '@material-ui/core'
import BaseTooltip from 'components/BaseTooltip'
import BaseMenu from 'components/BaseMenu'
import BaseButton, { BaseButtonProps } from 'components/BaseButton'
import { useSelector } from 'react-redux'
import { $isConnected, $selectedWToken, $connecting } from 'modules/wallet/selectors'
import { getWalletData, disconnectWallet } from 'modules/wallet/slice'
import { useAppDispatch, usePopoverAnchor } from 'hooks'
import { MouseEventHandler } from 'react'

export interface ConnectButtonProps extends BaseButtonProps {
  withMenu?: boolean
}

const useStyles = makeStyles((theme) => ({
  iconBalance: {
    marginRight: theme.spacing(1),
  },
  paper: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
  },
  iconInfo: {
    position: 'absolute',
    right: theme.spacing(2),
    fontSize: '16px',
    marginLeft: theme.spacing(4),
  },
  connectionText: {
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'pre',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
}))

export const ConnectButton = ({ loading, withMenu = false, ...rest }: ConnectButtonProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const isConnected = useSelector($isConnected)
  const connecting = useSelector($connecting)
  const wToken = useSelector($selectedWToken)

  const connectWallet = () => dispatch(getWalletData())
  const { anchorEl, close, isOpen, setAnchorEl } = usePopoverAnchor()

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    isConnected ? setAnchorEl(e.currentTarget) : connectWallet()
  }

  return (
    <>
      <BaseButton
        variant={isConnected ? 'outlined' : 'contained'}
        disabled={connecting}
        color="primary"
        size="large"
        style={{ zIndex: isOpen ? 1301 : 0 }}
        onClick={handleClick}
        {...rest}
        loading={connecting || (isConnected && loading)}
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
      {withMenu && (
        <BaseMenu
          open={isOpen}
          classes={{ paper: classes.paper }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClick={close}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={() => dispatch(disconnectWallet())}>
            <Typography variant="body2">Disconnect</Typography>
          </MenuItem>
        </BaseMenu>
      )}
    </>
  )
}
