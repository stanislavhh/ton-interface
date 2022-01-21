import { Button, ButtonProps, Typography, Icon, makeStyles, Avatar } from '@material-ui/core'
import { COLOR_WHITE } from 'helpers/themeHelper'
import { Token } from 'modules/shared'

export type TokenButtonProps = ButtonProps & { token: Token | null }

const useStyles = makeStyles((theme) => ({
  tokenButton: {
    backgroundColor: COLOR_WHITE,
    height: '60.75px',
    minWidth: '100px',
    color: ({ symbol }: { symbol: string | undefined }) =>
      symbol ? theme.palette.text.primary : theme.palette.text.secondary,
  },
  tokenTypo: {
    color: ({ symbol }: { symbol: string | undefined }) =>
      symbol ? theme.palette.text.primary : theme.palette.text.secondary,
  },
  avatar: {
    width: '28px',
    height: '28px',
    marginRight: theme.spacing(1),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}))

export const TokenButton = ({ token, onClick }: TokenButtonProps) => {
  const { logoURI, symbol } = token || {}
  const classes = useStyles({ symbol })

  return (
    <Button variant="outlined" fullWidth className={classes.tokenButton} onClick={onClick}>
      {logoURI && <Avatar className={classes.avatar} src={logoURI} />}
      {symbol || (
        <Typography variant="body2" className={classes.tokenTypo}>
          Select Token
        </Typography>
      )}
      {!symbol && <Icon className={classes.icon}>add</Icon>}
    </Button>
  )
}
