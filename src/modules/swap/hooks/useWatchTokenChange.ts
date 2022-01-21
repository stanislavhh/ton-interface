import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $prices } from 'modules//layout/selectors'
import { getTokenPrice } from 'modules/layout/slice'
import { Token } from 'modules//shared'

export const useWatchTokenChange = (token: Token | null) => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector($prices)

  useEffect(() => {
    if (token && !prices.find(({ name: tokenName }) => token.name === tokenName)) {
      dispatch(getTokenPrice(token.name))
    }
  }, [token])
}
