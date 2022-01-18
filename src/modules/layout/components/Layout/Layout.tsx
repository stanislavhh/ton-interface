import { makeStyles, Container } from '@material-ui/core'
import { ReactChildren, ReactElement } from 'react'

import { Header } from 'modules/layout/components/Header'
import { MobileNavDrawer } from 'modules/layout/components/MobileNavDrawer'

const useStyles = makeStyles(() => ({
  content: {},
}))

export const Layout = ({ children }: { children: ReactChildren | ReactElement }): JSX.Element => {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={classes.content}>
      <MobileNavDrawer />
      <Header />
      {children}
    </Container>
  )
}
