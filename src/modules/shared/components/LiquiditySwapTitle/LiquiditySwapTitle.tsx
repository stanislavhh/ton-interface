import { ReactNode } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { BaseLink } from 'components/BaseLink'

export interface LiquiditySwapTitleProps {
  title: string | ReactNode
  secondaryTitle: string | ReactNode
  to: string
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing(3),
  },
}))

export const LiquiditySwapTitle = ({ secondaryTitle, title, to }: LiquiditySwapTitleProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={10} className={classes.titleContainer}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h5">
        <BaseLink to={to}>{secondaryTitle}</BaseLink>
      </Typography>
    </Grid>
  )
}
