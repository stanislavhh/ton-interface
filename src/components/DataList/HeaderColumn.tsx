import { Box, Grid, Typography, GridProps, makeStyles } from '@material-ui/core'
import { SortIcon } from './SortIcon'
import { SortOrders } from 'modules/shared'

const useHeaderStyles = makeStyles((theme) => ({
  flexCenter: {
    justifyContent: 'center',
  },
  headerTypo: {
    marginRight: theme.spacing(0.5),
  },
}))

export interface HeaderColumnProps extends GridProps {
  onSortChange: (nextOrder: SortOrders | '', field: string) => void
  order: SortOrders | ''
  display: any
  title: string
  field: string
  className?: string
}

export const HeaderColumn = ({ order, field, onSortChange, className = '', title, ...rest }: HeaderColumnProps) => {
  const classes = useHeaderStyles()

  return (
    <Grid {...rest} className={`${classes.flexCenter} ${className}`} item component={Box}>
      <Typography variant="caption" color="textSecondary" className={classes.headerTypo}>
        {title}
      </Typography>
      <SortIcon setOrder={onSortChange} field={field} order={order} />
    </Grid>
  )
}
