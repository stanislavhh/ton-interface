import { Container } from '@material-ui/core'

import { useLoadTokens } from 'modules/layout/hooks'

import { Header } from '../Header'
import { MobileNavDrawer } from '../MobileNavDrawer'
import PageViewer from './PageViewer'
import Alert from '../Alert'

export const Layout = (): JSX.Element => {
  useLoadTokens()

  return (
    <Container maxWidth="lg">
      <MobileNavDrawer />
      <Header />
      <PageViewer />
      <Alert />
    </Container>
  )
}
