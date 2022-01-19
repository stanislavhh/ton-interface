import { Button, ButtonProps, Icon, makeStyles, Avatar } from '@material-ui/core'
import { COLOR_WHITE } from 'helpers/themeHelper'
import { Token } from 'modules/shared'

export type TokenButtonProps = ButtonProps & { token: Token | null }

const useStyles = makeStyles((theme) => ({
  tokenButton: {
    backgroundColor: COLOR_WHITE,
    height: '60.75px',
    minWidth: '100px',
    color: ({ name }: { name: string | undefined }) =>
      name ? theme.palette.text.primary : theme.palette.text.disabled,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}))

export const TokenButton = ({ token, onClick }: TokenButtonProps) => {
  const { logoURI, name } = token || {}
  const classes = useStyles({ name })

  return (
    <Button variant="outlined" fullWidth className={classes.tokenButton} onClick={onClick}>
      {logoURI && <Avatar src={logoURI} />}
      {name || 'Select Token'}
      {!name && <Icon className={classes.icon}>add</Icon>}
    </Button>
  )
}
