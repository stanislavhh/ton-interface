import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { LayoutState, DrawerAction, AlertAction } from './types'

export const INITIAL_STATE: LayoutState = {
  mobileDrawerActive: false,
  alert: {
    type: undefined,
  },
}

const toggleDrawerReducer: CaseReducer<LayoutState, DrawerAction> = (state, { payload }) => {
  state.mobileDrawerActive = typeof payload === 'boolean' ? payload : !state.mobileDrawerActive
}

const toggleAlertReducer: CaseReducer<LayoutState, AlertAction> = (state, { payload }) => {
  state.alert = payload
}

const layoutSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDrawer: toggleDrawerReducer,
    toggleAlert: toggleAlertReducer,
  },
})

export const { toggleDrawer, toggleAlert } = layoutSlice.actions

export const appReducer = layoutSlice.reducer
