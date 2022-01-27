import { Box, Grid, makeStyles } from '@material-ui/core'
import { RowColumn } from 'components/DataList'
import { usdFormatter } from 'helpers/formatterHelper'
import { PoolTransaction } from 'modules/pools/types'
import { CSSProperties } from 'react'
import { BORDER_RADIUS2 } from 'helpers/themeHelper'
import { transactionsGridConfig } from 'modules/pools/components/PoolTransactionsList/gridConfig'

export type TransactionsRowProps = {
  data: PoolTransaction[]
  style: CSSProperties
  index: number
}

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    height: '52px',
    background: 'rgba(235,235,235, 0.2)',
    borderRadius: BORDER_RADIUS2,
    alignItems: 'center',
  },
  column: {
    justifyContent: 'center',
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

export const TransactionRow = ({ data, style, index }: TransactionsRowProps) => {
  const { date, token0Amount, token1Amount, totalValue, address } = data[index]
  const classes = useStyles()

  return (
    <Box style={style} key={index}>
      <Grid container className={classes.rowContainer}>
        <RowColumn {...transactionsGridConfig.token0Amount} value={token0Amount} />
        <RowColumn {...transactionsGridConfig.token1Amount} className={classes.column} value={token1Amount} />
        <RowColumn
          {...transactionsGridConfig.totalValue}
          className={`${classes.column} ${classes.xsTotalValue}`}
          value={usdFormatter.format(Number(totalValue))}
        />
        <RowColumn {...transactionsGridConfig.address} className={classes.column} value={address} />
        <RowColumn {...transactionsGridConfig.date} className={classes.date} value={date} />
      </Grid>
    </Box>
  )
}
