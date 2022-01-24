import { ReactNode } from 'react'
import { Card, Grid, GridSize, makeStyles } from '@material-ui/core'

export interface LiquiditySwapCardContainerProps {
  children: ReactNode | ReactNode[]
  md?: GridSize
  cardClass?: string
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

export const LiquiditySwapCardContainer = ({ children, cardClass = '', md = 9 }: LiquiditySwapCardContainerProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={md} className={classes.cardContainer}>
      <Card className={`${classes.card} ${cardClass}`}>{children}</Card>
    </Grid>
  )
}
