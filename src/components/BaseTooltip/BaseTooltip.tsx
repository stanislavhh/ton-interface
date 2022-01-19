import React from 'react'
import { Tooltip as MuiTooltip, TooltipProps, Zoom } from '@material-ui/core'

export const BaseTooltip = (props: TooltipProps): JSX.Element => {
  const { children, ...rest } = props

  return (
    <MuiTooltip TransitionComponent={Zoom} arrow TransitionProps={{ timeout: 200 }} {...rest}>
      {children}
    </MuiTooltip>
  )
}
