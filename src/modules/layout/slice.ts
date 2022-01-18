import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_STATE } from './constants'

export interface LayoutState {
  mobileDrawerActive: boolean
}

const toggleDrawerReducer: CaseReducer<LayoutState, PayloadAction<boolean | undefined>> = (state, action) => {
  state.mobileDrawerActive = typeof action === 'boolean' ? action : !state.mobileDrawerActive
}

const layoutSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDrawer: toggleDrawerReducer,
  },
})

export const { toggleDrawer } = layoutSlice.actions

export const appReducer = layoutSlice.reducer
