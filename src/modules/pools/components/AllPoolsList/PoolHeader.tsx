import { Grid } from '@material-ui/core'
import { SearchColumn, SearchColumnProps, useHeaderStyles, HeaderColumn } from 'components/DataList'
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
        sm={1}
        md={2}
        display={{ xs: 'none', sm: 'flex' }}
        title="Fee"
        onSortChange={onSortChange}
        field="feeTier"
        order={sortOptions[0].order}
      />
      <HeaderColumn
        sm={3}
        md={2}
        display={{ xs: 'none', sm: 'flex' }}
        title="Liquidity"
        onSortChange={onSortChange}
        field="liquidity"
        order={sortOptions[1].order}
      />
      <HeaderColumn
        sm={3}
        md={2}
        display={{ xs: 'none', sm: 'flex' }}
        title="Volume 7d"
        onSortChange={onSortChange}
        field="volumeUSD"
        order={sortOptions[2].order}
      />
      <HeaderColumn
        xs={4}
        sm={1}
        md={2}
        display={{ xs: 'flex' }}
        title="APR"
        onSortChange={onSortChange}
        field="apr"
        order={sortOptions[3].order}
      />
    </Grid>
  )
}
