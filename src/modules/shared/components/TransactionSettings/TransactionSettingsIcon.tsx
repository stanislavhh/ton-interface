import { Icon, makeStyles } from '@material-ui/core'
import { TransactionSettingsPopup } from './TransactionSettingsPopup'
import { iconsTransition } from 'helpers/themeHelper'
import { usePopoverAnchor } from 'hooks'

const useStyles = makeStyles(() => ({
  settingsIcon: {
    ...iconsTransition,
  },
}))

export const TransactionSettingsIcon = () => {
  const classes = useStyles()
  const { anchorEl, close, isOpen, setAnchorEl } = usePopoverAnchor()

  return (
    <>
      <Icon className={classes.settingsIcon} color="primary" onClick={(e) => setAnchorEl(e.currentTarget)}>
        settings
      </Icon>
      <TransactionSettingsPopup
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={close}
        anchorEl={anchorEl}
      />
    </>
  )
}
