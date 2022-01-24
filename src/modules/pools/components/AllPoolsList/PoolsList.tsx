import { FixedSizeList as List } from 'react-window'

import { PoolWithLogo } from 'modules/pools/types'
import { PoolRow } from './PoolRow'
import { PoolHeader } from './PoolHeader'

export interface PoolsListProps {
  pools: PoolWithLogo[]
}

export const PoolsList = ({ pools }: PoolsListProps) => {
  return (
    <>
      <PoolHeader />
      <List itemData={pools} itemCount={pools.length} itemSize={56} width="100%" height={500}>
        {PoolRow}
      </List>
    </>
  )
}
