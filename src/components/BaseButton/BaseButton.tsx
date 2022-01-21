import React from 'react'
import { Button, ButtonProps, CircularProgress } from '@material-ui/core'

export interface BaseButtonProps extends ButtonProps {
  loading?: boolean
  loaderSize?: number
}
export const BaseButton = (props: BaseButtonProps): JSX.Element => {
  const { loading, loaderSize = 32, children, ...rest } = props

  return <Button {...rest}>{loading ? <CircularProgress size={loaderSize} /> : children}</Button>
}
