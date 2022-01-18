// Providers
import { ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Layout
import { Layout } from 'modules/layout'

// Store
import { store } from 'store'

// Theme
import { theme } from 'helpers/themeHelper'

// Views
import { SwapView } from 'modules/swap'
import { LiquidityView } from 'modules/liquidity'
import { PoolsView } from 'modules/pools'

export const Main = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path="/" element={<SwapView />} />
              <Route path="/liquidity" element={<LiquidityView />} />
              <Route path="/pools" element={<PoolsView />} />
            </Routes>
          </Layout>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Main
