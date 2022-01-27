import { useEffect, useState } from 'react'
import { SortOrders } from 'modules/shared'

export interface SortOption {
  order: SortOrders | ''
  field: string
  type?: string
}

export interface FilterQuery {
  field: string
  value: string | number
  comparatorFn?: (p0: any, p1: any) => boolean
}

const defaultComparator = (value1: string, value2: string) => value1.toLowerCase().includes(value2.toLowerCase())

export const useDataFiltering = (data: any[], queries: FilterQuery[]) => {
  const [filteredData, setData] = useState<any[]>(data)

  useEffect(() => {
    let nextData = data.filter((item) => {
      let passedFilter = false
      queries.forEach((query) => {
        if (!query.value) {
          passedFilter = true
        }
        // If one query passed than move on(OR) - can be improved and add AND cb
        if (passedFilter) {
          return
        }

        passedFilter = query.comparatorFn
          ? query.comparatorFn(item, query.value)
          : defaultComparator(item[query.field], query.value as string)
      })

      return passedFilter
    })

    setData(nextData)
  }, [data, queries])

  return { data: filteredData }
}

// currently has only string | number support
export const useDataSorting = (data: any[], options: SortOption[]) => {
  const [sortedData, setData] = useState<any[]>(data)

  useEffect(() => {
    let nextData = [...data]
    options.forEach((option) => {
      if (!option.order) {
        return
      }

      const sortedByOption = nextData.sort((a, b) => {
        if (option.type === 'number') {
          return a[option.field] - b[option.field]
        }

        if (option.type === 'date') {
          return +new Date(a[option.field]) - +new Date(b[option.field])
        }

        if (a[option.field] < b[option.field]) return -1
        if (a[option.field] > b[option.field]) return 1
        return 0
      })

      nextData = option.order === SortOrders.ASC ? sortedByOption : sortedByOption.reverse()
    })

    setData(nextData)
  }, [data, options])

  return { data: sortedData }
}
