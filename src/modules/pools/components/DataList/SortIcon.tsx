import { Box, Icon, makeStyles } from '@material-ui/core'
import { SortOption } from 'hooks'
import { SortOrders } from 'modules/shared'

export interface SortIconProps extends SortOption {
  setOrder: (nextOrder: SortOrders | '', field: string) => void
}

const useStyles = makeStyles(() => ({
  container: {
    width: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  iconUp: {
    top: '-8px',
    left: '-7px',
    position: 'absolute',
  },
  iconDown: {
    left: '-7px',
    display: 'block',
    position: 'absolute',
  },
}))

export const SortIcon = ({ field, order, setOrder }: SortIconProps) => {
  const classes = useStyles()

  const nextOrder = order === '' ? SortOrders.DESC : order === SortOrders.DESC ? SortOrders.ASC : ''

  const onSortClick = () => setOrder(nextOrder, field)

  return (
    <Box className={classes.container} onClick={onSortClick}>
      <Icon className={classes.iconUp} color={order === SortOrders.ASC ? 'primary' : 'disabled'}>
        arrow_drop_up
      </Icon>
      <Icon className={classes.iconDown} color={order === SortOrders.DESC ? 'primary' : 'disabled'}>
        arrow_drop_down
      </Icon>
    </Box>
  )
}
