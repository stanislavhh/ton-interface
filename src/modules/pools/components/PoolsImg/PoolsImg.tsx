import { makeStyles } from '@material-ui/core'
import Image from 'assets/pools.png'

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      bottom: '0%',
      width: '300px',
      left: 'calc(0% - 280px)',
    },
  },
}))
export const PoolsImg = () => {
  const classes = useStyles()

  return <img src={Image} className={classes.image} />
}
