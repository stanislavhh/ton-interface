import React from 'react'
import { TextField, Typography, Box, TextFieldProps, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  typo: {
    marginBottom: theme.spacing(1),
  },
}))

export const BaseInput = (props: TextFieldProps): JSX.Element => {
  const { label, ...rest } = props
  const classes = useStyles()

  return (
    <Box>
      <Typography className={classes.typo} variant="body1">
        {label}
      </Typography>
      <TextField {...rest} />
    </Box>
  )
}
