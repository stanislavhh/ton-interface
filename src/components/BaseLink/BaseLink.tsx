import React, { ForwardedRef, RefObject } from 'react'
import { Link as MaterialLink, LinkProps as LinkMuiProps } from '@material-ui/core'
import { LinkProps } from 'react-router-dom'
import { useRouter } from 'hooks'
import { MouseEventHandler } from 'react'

export type BaseLinkProps = LinkMuiProps & LinkProps & { ref?: ForwardedRef<unknown> }

export const BaseLink = React.forwardRef((props: BaseLinkProps, ref): JSX.Element => {
  const { to, onClick, children, ...rest } = props
  const router = useRouter()

  const navigate: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement> = (event) => {
    router.navigate(to)
    onClick?.(event)
  }

  return (
    <MaterialLink {...rest} ref={ref as RefObject<HTMLSpanElement>} onClick={navigate}>
      {children}
    </MaterialLink>
  )
})
