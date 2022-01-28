// Providers
import { ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

// Layout
import { Layout } from 'modules/layout'

// Store
import { store } from 'store'

// Theme
import { theme } from 'helpers/themeHelper'

export const Main = (): JSX.Element => {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default Main
