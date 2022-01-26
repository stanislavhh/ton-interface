import React, { useEffect, useState } from 'react'
import { Grow, makeStyles } from '@material-ui/core'
import { AlertProps, Alert } from '@material-ui/lab'
import { BORDER_RADIUS2, COLOR_TEXT } from 'helpers/themeHelper'

interface NotificationBoxProps extends AlertProps {
  show?: boolean
}

export const commonNotificationStyles = {
  backdropFilter: 'blur(5px)',
  color: COLOR_TEXT,
  borderRadius: BORDER_RADIUS2,
}

const useStyles = makeStyles(() => ({
  filledInfo: {
    background: 'rgba(0, 136, 204, 0.2)',
    ...commonNotificationStyles,
  },
  standardSuccess: {
    background: 'rgba(0, 136, 204, 0.5)',
    ...commonNotificationStyles,
  },
}))

export const NotificationBox = (props: NotificationBoxProps): JSX.Element | null => {
  const { children, show, classes = {}, ...rest } = props
  const innerClasses = useStyles()

  const [showBox, setShowBox] = useState(show)

  useEffect(() => {
    if (show) {
      setShowBox(true)
    }
  }, [show])

  if (!showBox) {
    return null
  }

  return (
    <Grow in={show} onExited={() => setShowBox(false)}>
      <Alert classes={{ ...innerClasses, ...classes }} {...rest}>
        {children}
      </Alert>
    </Grow>
  )
}
