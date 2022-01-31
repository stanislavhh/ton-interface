import { makeStyles } from '@material-ui/core'
import Image from 'assets/paper plane.png'

const useStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    zIndex: 1,
    top: '0%',
    width: '80px',
    left: '10%',
    [theme.breakpoints.only('sm')]: {
      left: '-5%',
    },
    [theme.breakpoints.only('xs')]: {
      top: '5%',
      left: 'auto',
      zIndex: -1,
    },
  },
}))
export const PaperPlaneImg = () => {
  const classes = useStyles()

  return <img src={Image} className={classes.image} />
}
