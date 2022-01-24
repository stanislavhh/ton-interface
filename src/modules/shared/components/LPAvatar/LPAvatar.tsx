import { Avatar, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'relative',
  },
  avatar0: {
    zIndex: 1,
    width: ({ size }: { size: number }) => `${size}px`,
    height: ({ size }: { size: number }) => `${size}px`,
  },
  avatar1: {
    width: ({ size }: { size: number }) => `${size - 8}px`,
    height: ({ size }: { size: number }) => `${size - 8}px`,
    position: 'absolute',
    top: '-25%',
    left: '50%',
  },
}))

export type LPAvatarProps = {
  avatar0?: string
  avatar1?: string
  size?: number
}

export const LPAvatar = ({ avatar0, avatar1, size = 40 }: LPAvatarProps) => {
  const classes = useStyles({ size })
  return (
    <Box className={classes.box}>
      <Avatar src={avatar0} className={classes.avatar0} />
      <Avatar src={avatar1} className={classes.avatar1} />
    </Box>
  )
}
