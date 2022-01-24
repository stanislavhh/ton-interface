import { Grid } from '@material-ui/core'
import { SearchColumn, SearchColumnProps, useHeaderStyles, HeaderColumn } from 'modules/pools/components/DataList'
import { SortOrders } from 'modules/shared'
import { SortOption } from 'hooks'

export interface PoolHeaderProps extends SearchColumnProps {
  onSortChange: (nextOrder: SortOrders | '', field: string) => void
  sortOptions: SortOption[]
}

export const PoolHeader = ({ onSortChange, sortOptions, ...rest }: PoolHeaderProps) => {
  const classes = useHeaderStyles()

  return (
    <Grid container className={classes.poolHeader}>
      <Grid xs={7} sm={3} item>
        <SearchColumn {...rest} />
      </Grid>
      <HeaderColumn
        title="Fee"
        sm={2}
        md={1}
        display={{ xs: 'none', sm: 'flex' }}
        onSortChange={onSortChange}
        field="feeTier"
        order={sortOptions[0].order}
      />
      <HeaderColumn
        title="Share of Pool"
        sm={2}
        md={2}
        display={{ xs: 'none', md: 'flex' }}
        onSortChange={onSortChange}
        field="poolShare"
        order={sortOptions[1].order}
      />
      <HeaderColumn
        title="My Liquidity"
        sm={3}
        md={2}
        display={{ xs: 'none', sm: 'flex' }}
        onSortChange={onSortChange}
        field="myLiquidity"
        order={sortOptions[2].order}
      />
      <HeaderColumn
        title="Daily income"
        xs={4}
        sm={3}
        md={2}
        display={{ xs: 'flex' }}
        onSortChange={onSortChange}
        field="dailyIncome"
        order={sortOptions[3].order}
      />
      <HeaderColumn
        title="APR"
        md={1}
        display={{ xs: 'none', md: 'flex' }}
        onSortChange={onSortChange}
        field="apr"
        order={sortOptions[4].order}
      />
    </Grid>
  )
}
