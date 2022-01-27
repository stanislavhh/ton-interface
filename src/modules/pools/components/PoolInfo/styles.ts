import { makeStyles } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'

type StyleProps = {
  swap: boolean
  loading: boolean
}

export const usePoolInfoStyles = makeStyles((theme) => ({
  card: {
    display: ({ loading }: StyleProps) => (loading ? 'flex' : 'block'),
    alignItems: ({ loading }: StyleProps) => (loading ? 'center' : 'none'),
    justifyContent: ({ loading }: StyleProps) => (loading ? 'center' : 'none'),
    height: '100%',
    boxSizing: 'border-box',
    paddingTop: theme.spacing(5),
    position: 'relative',
    minHeight: '400px',
    transformStyle: 'preserve-3d',
    transition: 'transform 1s',
    transform: ({ swap }: StyleProps) => `rotateY(${swap ? '180deg' : '0'})`,
  },
  poolCardContainer: {
    opacity: ({ swap }: StyleProps) => (swap ? 0 : 1),
    transition: 'opacity 0.5s',
    transitionDelay: ({ swap }: StyleProps) => (swap ? '0s' : '0.35s'),
  },
  myCardContainer: {
    position: 'absolute',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    transform: ({ swap }: StyleProps) => `rotateY(180deg) translateX(${swap ? '0' : '1000%'})`,
    opacity: ({ swap }: StyleProps) => (swap ? 1 : 0),
    transition: ({ swap }: StyleProps) => `opacity 0.5s ${swap ? '0.35s' : '0s'}, transform 0s ${swap ? '0s' : '0.5s'}`,
  },
  rowInfo: {
    marginTop: theme.spacing(3),
  },
  infoLabel: {
    display: 'inline-flex',
    opacity: 0.6,
  },
  rotateIcon: {
    ...iconsTransition,
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: '24px',
    height: '24px',
  },
  addLiquidityButton: {
    width: '50%',
  },
}))
