import { Box, Grid, makeStyles } from '@material-ui/core'
import { SortOrders } from 'modules/shared'
import { SortOption } from 'hooks'
import { HeaderColumn } from 'components/DataList'
import { transactionsGridConfig } from 'modules/pools/components/PoolTransactionsList/gridConfig'

export interface TransactionHeaderProps {
  onSortChange: (nextOrder: SortOrders | '', field: string) => void
  sortOptions: SortOption[]
  token0Name?: string
  token1Name?: string
}

const useStyles = makeStyles((theme) => ({
  token0Amount: {
    justifyContent: 'flex-start',
  },
  xsTotalValue: {
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.only('md')]: {
      justifyContent: 'flex-start',
    },
  },
  date: {
    justifyContent: 'flex-end',
  },
}))

export const TransactionHeader = ({
  onSortChange,
  sortOptions,
  token0Name = '',
  token1Name = '',
}: TransactionHeaderProps) => {
  const classes = useStyles()
  return (
    <Box mb={1}>
      <Grid container>
        <HeaderColumn
          {...transactionsGridConfig.token0Amount}
          title={token0Name}
          onSortChange={onSortChange}
          field="token0Amount"
          order={sortOptions[0].order}
          className={classes.token0Amount}
        />
        <HeaderColumn
          {...transactionsGridConfig.token1Amount}
          title={token1Name}
          onSortChange={onSortChange}
          field="token1Amount"
          order={sortOptions[1].order}
        />
        <HeaderColumn
          {...transactionsGridConfig.totalValue}
          title="Total Value"
          onSortChange={onSortChange}
          field="totalValue"
          order={sortOptions[2].order}
          className={classes.xsTotalValue}
        />
        <HeaderColumn
          {...transactionsGridConfig.address}
          title="Address"
          onSortChange={onSortChange}
          field="address"
          order={sortOptions[3].order}
        />
        <HeaderColumn
          {...transactionsGridConfig.date}
          title="Date"
          onSortChange={onSortChange}
          field="date"
          order={sortOptions[4].order}
          className={classes.date}
        />
      </Grid>
    </Box>
  )
}
