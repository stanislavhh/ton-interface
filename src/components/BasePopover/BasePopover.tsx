import React from 'react'
import { makeStyles, Popover, PopoverProps } from '@material-ui/core'
import { BORDER_RADIUS1 } from 'helpers/themeHelper'

export interface BasePopoverProps extends PopoverProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: ({ open }: { open: boolean }) => `rgba(0, 0,0, ${open ? '0.25' : '0'})`,
  },
  popover: {
    borderRadius: BORDER_RADIUS1,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
  },
}))

export const BasePopover = (props: BasePopoverProps): JSX.Element => {
  const { children, open, ...rest } = props
  const classes = useStyles({ open })

  return (
    <Popover {...rest} open={open} classes={{ paper: classes.popover, root: classes.root }}>
      {children}
    </Popover>
  )
}
