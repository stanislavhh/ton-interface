import { ReactNode } from 'react'
import { Card, Grid, makeStyles } from '@material-ui/core'

export interface LiquiditySwapCardContainerProps {
  children: ReactNode | ReactNode[]
}

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: theme.spacing(2),
  },
  card: {
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: theme.spacing(3),
  },
}))

export const LiquiditySwapCardContainer = ({ children }: LiquiditySwapCardContainerProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={9} className={classes.cardContainer}>
      <Card className={classes.card}>{children}</Card>
    </Grid>
  )
}
