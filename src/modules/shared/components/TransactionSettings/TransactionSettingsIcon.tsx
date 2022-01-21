import { useState } from 'react'
import { Icon, makeStyles } from '@material-ui/core'
import { TransactionSettingsPopup } from './TransactionSettingsPopup'
import { iconsTransition } from 'helpers/themeHelper'

const useStyles = makeStyles(() => ({
  settingsIcon: {
    ...iconsTransition,
  },
}))

export const TransactionSettingsIcon = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLSpanElement) | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Icon
        aria-describedby={id}
        className={classes.settingsIcon}
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        settings
      </Icon>
      <TransactionSettingsPopup
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      />
    </>
  )
}
