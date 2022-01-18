import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { LayoutState } from './slice'

export const app = (state: StoreState) => state.app

export const $mobileDrawerActive = createSelector(app, (app: LayoutState) => app.mobileDrawerActive)
