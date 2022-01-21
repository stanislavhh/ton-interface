import { StoreState } from 'store/types'
import { createSelector } from '@reduxjs/toolkit'
import { AppState } from './types'

export const app = (state: StoreState) => state.app

export const $mobileDrawerActive = createSelector(app, (app: AppState) => app.mobileDrawerActive)

export const $alert = createSelector(app, (app: AppState) => app.alert)

export const $loadingTokens = createSelector(app, (app: AppState) => app.loadingTokens)

export const $loadingPrice = createSelector(app, (app: AppState) => app.loadingPrice)

export const $tokens = createSelector(app, (app: AppState) => app.tokens)

export const $prices = createSelector(app, (app: AppState) => app.prices)

export const $transactionSettings = createSelector(app, (app: AppState) => app.transactionSettings)

export const $tokensWithPrices = createSelector([$tokens, $prices], (tokens, prices) =>
  tokens.map((token) => ({
    ...token,
    price: prices.find(({ name }) => token.name === name)?.price || 0,
  })),
)
