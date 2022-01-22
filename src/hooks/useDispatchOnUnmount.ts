import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { PayloadAction } from '@reduxjs/toolkit'

export const useDispatchOnUnmount = (action: PayloadAction) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    return function () {
      dispatch(action)
    }
  }, [])
}
