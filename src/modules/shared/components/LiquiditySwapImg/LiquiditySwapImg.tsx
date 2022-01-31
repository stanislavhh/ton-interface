import { makeStyles } from '@material-ui/core'
import Image from 'assets/man swap.svg'

const useStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    zIndex: 1,
    top: '70%',
    width: '300px',
    left: '75%',
    [theme.breakpoints.only('sm')]: {
      width: '200px',
      top: '80%',
      left: '80%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '200px',
      top: '105%',
      left: 'auto',
    },
  },
}))
export const LiquiditySwapImg = () => {
  const classes = useStyles()

  return <img src={Image} className={classes.image} />
}
