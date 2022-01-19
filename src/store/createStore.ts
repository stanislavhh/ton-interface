// Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Middlewares
import { createLogger } from 'redux-logger'

// Reducers
import { appReducer } from 'modules/layout'
import { walletReducer } from 'modules/wallet'
import { swapReducer } from 'modules/swap'

const logger = createLogger()

const store = configureStore({
  reducer: combineReducers({
    app: appReducer,
    wallet: walletReducer,
    swap: swapReducer,
  }),
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({ serializableCheck: false })

    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger)
    }
    return middlewares
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
