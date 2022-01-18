import { Link as MaterialLink, LinkProps as LinkMuiProps } from '@material-ui/core'

import { LinkProps } from 'react-router-dom'
import { useRouter } from 'hooks'
import { MouseEventHandler } from 'react'

export type BaseLinkProps = LinkMuiProps & LinkProps

export const BaseLink = (props: BaseLinkProps): JSX.Element => {
  const { to, onClick, children, ...rest } = props
  const router = useRouter()

  const navigate: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement> = (event) => {
    router.navigate(to)
    onClick?.(event)
  }

  return (
    <MaterialLink {...rest} onClick={navigate}>
      {children}
    </MaterialLink>
  )
}
