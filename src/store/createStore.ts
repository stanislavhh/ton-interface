// Redux
import { Reducer } from 'redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Middlewares
import { createLogger } from 'redux-logger'

// Reducers
import { appReducer } from 'modules/layout'
import { walletReducer } from 'modules/wallet'
import { swapReducer } from 'modules/swap'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

const logger = createLogger()

const lazyReducers: { [key: string]: Reducer } = {}

const staticReducers = {
  app: appReducer,
  wallet: walletReducer,
  swap: swapReducer,
}

function createReducer(lazyReducers = {}) {
  return combineReducers({
    ...lazyReducers,
    ...staticReducers,
  })
}

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({ serializableCheck: false })

    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger)
    }
    return middlewares
  },
})

/**
 * This fn allows us to lazy load dynamic modules
 * @param key
 * @param reducer
 */
export const injectReducer = (key: string, reducer: Reducer) => {
  lazyReducers[key] = reducer
  store.replaceReducer(createReducer(lazyReducers))
}

export default store
