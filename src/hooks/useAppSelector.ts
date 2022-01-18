import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from 'store/createStore'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
