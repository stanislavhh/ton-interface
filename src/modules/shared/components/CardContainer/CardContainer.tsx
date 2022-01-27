import { ReactNode } from 'react'
import { Card, Grid, GridSize, GridProps, makeStyles } from '@material-ui/core'

export interface CardContainerProps extends GridProps {
  children: ReactNode | ReactNode[]
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

export const CardContainer = ({ children, cardClass = '', md = 9, ...rest }: CardContainerProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={md} className={classes.cardContainer} {...rest}>
      <Card className={`${classes.card} ${cardClass}`}>{children}</Card>
    </Grid>
  )
}
