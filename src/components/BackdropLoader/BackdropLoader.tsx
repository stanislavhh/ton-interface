import React, { ReactNode } from 'react'
import { Backdrop, Box, Typography, makeStyles } from '@material-ui/core'
import { COLOR_WHITE } from 'helpers/themeHelper'

interface BackdropLoaderProps {
  open?: boolean
  text?: string | ReactNode
}

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    opacity: 0.75,
    backdropFilter: 'blur(5px)',
  },
  typo: {
    marginRight: theme.spacing(2),
    opacity: 0.9,
    fontWeight: 400,
    lineHeight: '28px',
    color: COLOR_WHITE,
  },
}))

export const BackdropLoader = (props: BackdropLoaderProps): JSX.Element => {
  const classes = useStyles()
  const { open, text } = props

  return (
    <Backdrop open={open || false} className={classes.root}>
      <Box display="flex" justifyContent="center" alignItems="flex-end">
        <Typography variant="h3" className={classes.typo}>
          {text}
        </Typography>
        <Box className="dot-carousel" />
      </Box>
    </Backdrop>
  )
}
