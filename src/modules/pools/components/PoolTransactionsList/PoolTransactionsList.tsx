import CardContainer from 'modules/shared/components/CardContainer'
import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import { FixedSizeList as List } from 'react-window'
import { SortOption, useAppSelector, useDataSorting } from 'hooks'
import { $loadingPoolTransactions, $poolTransactions, $selectedPool } from 'modules/pools/selectors'
import { TransactionRow } from 'modules/pools/components/PoolTransactionsList/TransactionRow'
import { useState } from 'react'
import { POOL_TRANSACTIONS_INITIAL_OPTIONS } from 'modules/pools/constants'
import { SortOrders } from 'modules/shared'
import { TransactionHeader } from 'modules/pools/components/PoolTransactionsList/TransactionHeader'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    minHeight: '400px',
  },
}))

export const PoolTransactionsList = () => {
  const classes = useStyles()
  const pool = useAppSelector($selectedPool)
  const poolTransactions = useAppSelector($poolTransactions)
  const loading = useAppSelector($loadingPoolTransactions)
  const [sortOptions, setSortOptions] = useState<SortOption[]>(POOL_TRANSACTIONS_INITIAL_OPTIONS.sortOptions)
  const { data: sortedTransactions } = useDataSorting(poolTransactions, sortOptions)

  const handleSortChange = (order: SortOrders | '', field: string) => {
    let nextOptions = sortOptions.map((option) => ({ ...option, order: option.field === field ? order : '' }))

    setSortOptions(nextOptions)
  }

  return (
    <CardContainer xs={12} md={6} lg={7} className="" cardClass={classes.card}>
      {loading ? (
        <CircularProgress size={32} />
      ) : (
        <Box width="100%">
          <TransactionHeader
            onSortChange={handleSortChange}
            token0Name={pool?.token0.name}
            token1Name={pool?.token1.name}
            sortOptions={sortOptions}
          />
          <List
            height={400}
            itemData={sortedTransactions}
            itemSize={56}
            itemCount={sortedTransactions.length}
            width="100%"
          >
            {TransactionRow}
          </List>
        </Box>
      )}
    </CardContainer>
  )
}
