import { useEffect, useRef, useState } from 'react'
import { FilterQuery, SortOption, useDataFiltering, useDataSorting } from 'hooks'
import { debounce } from '@material-ui/core'
import { Pool, WalletPoolsSelector } from 'modules/pools/types'
import { SortOrders } from 'modules/shared'

/**
 * I keep the filtering and sorting states outside the redux:
 * -the data for sorted or filtered list doesnt seem to be needed in main storage
 * -it is easier to handle multiple lists with this hook
 * @param pools
 * @param initialQueries
 * @param initialSorts
 */
export const usePoolsList = (
  pools: Pool[] | WalletPoolsSelector[],
  initialQueries: FilterQuery[] = [],
  initialSorts: SortOption[] = [],
) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [queries, setQueries] = useState<FilterQuery[]>(initialQueries)
  const [sortOptions, setSortOptions] = useState<SortOption[]>(initialSorts)
  const { data: filteredPools } = useDataFiltering(pools, queries)
  const { data: filteredAndSortedPools } = useDataSorting(filteredPools, sortOptions)

  const debounced = useRef(debounce((value) => setQueries([{ field: 'name', value: value }]), 350))

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSortChange = (order: SortOrders | '', field: string) => {
    let nextOptions = sortOptions.map((option) => ({ ...option, order: option.field === field ? order : '' }))

    setSortOptions(nextOptions)
  }

  useEffect(() => {
    debounced.current(searchQuery)
    return () => {
      debounced.current.clear()
    }
  }, [searchQuery])

  return {
    filteredAndSortedPools,
    searchQuery,
    sortOptions,
    queries,
    handleSearchChange,
    handleSortChange,
  }
}
