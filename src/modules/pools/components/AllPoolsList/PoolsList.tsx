import { useAppSelector } from 'hooks'
import { $poolsSelector } from 'modules/pools/selectors'
import { usePoolsList } from 'modules/pools/hooks'
import { FixedSizeList as List } from 'react-window'
import { PoolRow } from './PoolRow'
import { PoolHeader } from './PoolHeader'

export const PoolsList = () => {
  const pools = useAppSelector($poolsSelector)

  const { handleSearchChange, filteredAndSortedPools, searchQuery } = usePoolsList(pools)

  return (
    <>
      <PoolHeader onChange={handleSearchChange} search={searchQuery} />
      <List
        itemData={filteredAndSortedPools}
        itemCount={filteredAndSortedPools.length}
        itemSize={56}
        width="100%"
        height={500}
      >
        {PoolRow}
      </List>
    </>
  )
}
