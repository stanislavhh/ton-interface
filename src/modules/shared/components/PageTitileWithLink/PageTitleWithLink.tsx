import { ReactNode } from 'react'
import { Grid, GridSize, makeStyles, Typography } from '@material-ui/core'
import { BaseLink } from 'components/BaseLink'

export interface PageTitleWithLinkProps {
  title: string | ReactNode
  secondaryTitle: string | ReactNode
  to: string
  md?: GridSize
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

export const PageTitleWithLink = ({ secondaryTitle, md = 10, title, to }: PageTitleWithLinkProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={md} className={classes.titleContainer}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h5">
        <BaseLink to={to}>{secondaryTitle}</BaseLink>
      </Typography>
    </Grid>
  )
}
