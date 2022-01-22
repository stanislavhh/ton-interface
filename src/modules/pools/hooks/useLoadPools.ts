import { useEffect } from 'react'
import { useAppDispatch } from 'hooks'
import { getPoolsList } from 'modules/pools/slice'

export const useLoadPools = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPoolsList())
  }, [dispatch])
}
