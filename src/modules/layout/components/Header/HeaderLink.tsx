import { Box, makeStyles } from '@material-ui/core'
import { BaseLink, BaseLinkProps } from 'components/BaseLink'

interface HeaderLinkProps extends BaseLinkProps {
  text: string
  isActive: boolean
}

const useHeaderLinkStyles = makeStyles(() => ({
  linkBox: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export const HeaderLink = (props: HeaderLinkProps): JSX.Element => {
  const classes = useHeaderLinkStyles(props)

  const { text, isActive, ...rest } = props

  return (
    <Box ml={3} className={classes.linkBox}>
      <BaseLink variant="h5" color={isActive ? 'secondary' : 'primary'} {...rest}>
        {text}
      </BaseLink>
    </Box>
  )
}
