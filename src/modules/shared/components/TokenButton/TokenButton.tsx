import { Button, ButtonProps, Typography, Icon, makeStyles, Avatar, Box } from '@material-ui/core'
import { COLOR_WHITE } from 'helpers/themeHelper'
import { Token } from 'modules/shared'

export type TokenButtonProps = ButtonProps & { token: Token | null; disallowTokenSelect?: boolean; height?: number }

type StyleProps = {
  symbol: string | undefined
  height: number
}
const useStyles = makeStyles((theme) => ({
  tokenButton: {
    backgroundColor: COLOR_WHITE,
    borderColor: 'rgba(0,0,0,0.2)',
    height: ({ height }: StyleProps) => `${height}px`,
    minWidth: '100px',
    color: ({ symbol }: StyleProps) => (symbol ? theme.palette.text.primary : theme.palette.text.secondary),
  },
  tokenTypo: {
    color: ({ symbol }: StyleProps) => (symbol ? theme.palette.text.primary : theme.palette.text.secondary),
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

export const TokenButton = ({ token, onClick, disallowTokenSelect, height = 60 }: TokenButtonProps) => {
  const { logoURI, symbol } = token || {}
  const classes = useStyles({ symbol, height })

  return disallowTokenSelect ? (
    <Box display="flex" alignItems="center" ml={2} height={height}>
      {logoURI && <Avatar className={classes.avatar} src={logoURI} />}
      {symbol && <Typography variant="body2">{symbol}</Typography>}
    </Box>
  ) : (
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
