import { Box, Grid, Typography, GridProps } from '@material-ui/core'
import { SortIcon } from './SortIcon'
import { SortOrders } from 'modules/shared'
import { useHeaderStyles } from './styles'

export interface HeaderColumnProps extends GridProps {
  onSortChange: (nextOrder: SortOrders | '', field: string) => void
  order: SortOrders | ''
  display: any
  title: string
  field: string
}

export const HeaderColumn = ({ order, field, onSortChange, title, ...rest }: HeaderColumnProps) => {
  const classes = useHeaderStyles()

  return (
    <Grid {...rest} className={classes.flexCenter} item component={Box}>
      <Typography variant="caption" color="textSecondary" className={classes.headerTypo}>
        {title}
      </Typography>
      <SortIcon setOrder={onSortChange} field={field} order={order} />
    </Grid>
  )
}
