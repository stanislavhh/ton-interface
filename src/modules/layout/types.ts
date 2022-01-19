import { PayloadAction } from '@reduxjs/toolkit'
import { ReactElement } from 'react'
import { Color } from '@material-ui/lab'
import { Token } from 'modules/shared'

export interface Alert {
  type: Color | undefined
  element?: ReactElement | string | undefined | null
}

export type LayoutState = {
  mobileDrawerActive: boolean
  alert: Alert
  tokens: Token[]
}

// Actions
export type DrawerAction = PayloadAction<boolean | undefined>
export type AlertAction = PayloadAction<Alert>
export type SetTokensAction = PayloadAction<Token[]>
