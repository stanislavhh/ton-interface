import { Box, makeStyles } from '@material-ui/core'
import { BaseLink, BaseLinkProps } from 'components/BaseLink'

interface DrawerLinkProps extends BaseLinkProps {
  text: string
  isActive: boolean
}

const useDrawerLinkStyles = makeStyles(() => ({
  linkBox: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export const DrawerLink = (props: DrawerLinkProps): JSX.Element => {
  const classes = useDrawerLinkStyles(props)
  const { text, isActive, ...rest } = props

  return (
    <Box ml={4} mb={2} className={classes.linkBox}>
      <BaseLink variant="h3" color={isActive ? 'secondary' : 'primary'} {...rest}>
        {text}
      </BaseLink>
    </Box>
  )
}
