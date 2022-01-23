import { Avatar, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'relative',
  },
  avatar0: {
    zIndex: 1,
  },
  avatar1: {
    width: '32px',
    height: '32px',
    position: 'absolute',
    top: '-25%',
    left: '50%',
  },
}))

export type LPAvatarProps = {
  avatar0?: string
  avatar1?: string
}

export const LPAvatar = ({ avatar0, avatar1 }: LPAvatarProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Avatar src={avatar0} className={classes.avatar0} />
      <Avatar src={avatar1} className={classes.avatar1} />
    </Box>
  )
}
