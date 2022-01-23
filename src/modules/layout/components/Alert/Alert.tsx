import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $alert } from 'modules/layout/selectors'
import { toggleAlert } from 'modules/layout/slice'
import NotificationBox from 'components/NotificationBox'

export const Alert = (): JSX.Element => {
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
        <NotificationBox show onClose={handleClose} severity={type}>
          {element}
        </NotificationBox>
      </Snackbar>
    </>
  )
}
