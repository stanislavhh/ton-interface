import { useEffect } from 'react'
import { useAppDispatch, useRouter } from 'hooks'
import { getPoolTransactions, selectPoolId } from 'modules/pools/slice'

export const useWatchSelectedPool = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const poolId = router.params.poolId

  useEffect(() => {
    dispatch(selectPoolId(poolId as string))
    dispatch(getPoolTransactions())

    return () => {
      dispatch(selectPoolId(null))
    }
  }, [poolId])
}
