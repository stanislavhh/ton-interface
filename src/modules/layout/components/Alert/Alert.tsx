import React from 'react'
import { makeStyles, Snackbar } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $alert } from 'modules/layout/selectors'
import { toggleAlert } from 'modules/layout/slice'
import NotificationBox, { commonNotificationStyles } from 'components/NotificationBox'
import { COLOR_WHITE } from 'helpers/themeHelper'

const useStyles = makeStyles(() => ({
  standardSuccess: {
    ...commonNotificationStyles,
    background: 'rgba(0, 136, 204, 0.7)',
    color: COLOR_WHITE,
    '& .MuiAlert-icon': {
      color: COLOR_WHITE,
    },
  },
}))

export const Alert = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { type, element } = useAppSelector($alert)
  const open = typeof type === 'string'

  const handleClose = () => dispatch(toggleAlert({ element, type: undefined }))

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
      >
        <NotificationBox show onClose={handleClose} classes={classes} severity={type}>
          {element}
        </NotificationBox>
      </Snackbar>
    </>
  )
}
