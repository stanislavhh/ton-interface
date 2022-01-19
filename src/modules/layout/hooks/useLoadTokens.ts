import { useEffect } from 'react'
import { useAppDispatch } from 'hooks'
import { getTokensList } from 'modules/layout/slice'

export const useLoadTokens = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTokensList())
  }, [dispatch])
}
