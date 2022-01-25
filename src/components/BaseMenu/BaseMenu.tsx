import React from 'react'
import { makeStyles, Menu, MenuProps } from '@material-ui/core'

export interface BaseMenuProps extends MenuProps {}

const useStyles = makeStyles((theme) => ({
  paper: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
    '& .MuiMenuItem-root': {
      minWidth: '180px',
      paddingBlock: theme.spacing(1.5),
    },
  },
}))

export const BaseMenu = (props: BaseMenuProps): JSX.Element => {
  const { children, className, ...rest } = props
  const classes = useStyles()

  return (
    <Menu {...rest} classes={classes}>
      {children}
    </Menu>
  )
}
