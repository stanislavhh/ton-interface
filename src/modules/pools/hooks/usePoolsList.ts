import { useEffect, useRef, useState } from 'react'
import { FilterQuery, SortOption, useDataFiltering, useDataSorting } from 'hooks'
import { debounce } from '@material-ui/core'
import { Pool } from 'modules/pools/types'

export const usePoolsList = (pools: Pool[]) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [queries, setQueries] = useState<FilterQuery[]>([{ field: 'name', value: '' }])
  const [sortOptions] = useState<SortOption[]>([])
  const { data: filteredPools } = useDataFiltering(pools, queries)
  const { data: filteredAndSortedPools } = useDataSorting(filteredPools, sortOptions)

  const debounced = useRef(debounce((value) => setQueries([{ field: 'name', value: value }]), 350))

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  useEffect(() => {
    debounced.current(searchQuery)
    return () => {
      debounced.current.clear()
    }
  }, [searchQuery])

  return {
    filteredAndSortedPools,
    handleSearchChange,
    searchQuery,
  }
}
