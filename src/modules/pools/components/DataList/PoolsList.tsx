import { FilterQuery, SortOption } from 'hooks'
import { usePoolsList } from 'modules/pools/hooks'
import { FixedSizeList as List } from 'react-window'
import { Pool, WalletPoolsSelector } from 'modules/pools/types'

export interface PoolsListProps {
  pools: Pool[] | WalletPoolsSelector[]
  initialFilterOptions: FilterQuery[]
  initialSortOptions: SortOption[]
  RowComponent: any
  HeaderComponent: any
}

export const PoolsList = ({
  pools,
  initialFilterOptions,
  initialSortOptions,
  RowComponent,
  HeaderComponent,
}: PoolsListProps) => {
  const { handleSearchChange, handleSortChange, filteredAndSortedPools, searchQuery, sortOptions } = usePoolsList(
    pools,
    initialFilterOptions,
    initialSortOptions,
  )

  return (
    <>
      <HeaderComponent
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        search={searchQuery}
        sortOptions={sortOptions}
      />
      <List
        itemData={filteredAndSortedPools}
        itemCount={filteredAndSortedPools.length}
        itemSize={56}
        width="100%"
        height={500}
      >
        {RowComponent}
      </List>
    </>
  )
}
