import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'hooks'
import { ROUTES } from 'modules/layout/constants'

// Views
import SwapView from 'modules/swap'
import LiquidityView from 'modules/liquidity'
import PoolsView from 'modules/pools'

const useStyles = makeStyles((theme) => ({
  enter: {
    opacity: '0',
    transform: 'scale(0.9)',
  },
  enterActive: {
    opacity: '1',
    transform: 'translateX(0)',
    transition: 'opacity 300ms, transform 300ms',
  },
  exit: {
    opacity: '1',
  },
  exitActive: {
    opacity: '0',
    transform: 'scale(0.9)',
    transition: 'opacity 300ms, transform 300ms',
  },
  pageContent: {
    marginTop: theme.spacing(3),
    paddingInline: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      paddingInline: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingInline: theme.spacing(8),
    },
  },
}))

export const PageViewer = (): JSX.Element => {
  const router = useRouter()
  const { pageContent, ...rest } = useStyles()
  const foundRoute = ROUTES.find(({ path }) => router.pathname === path)

  useEffect(() => {
    if (!foundRoute) {
      router.navigate('/')
    }
  }, [])

  return (
    <div className={pageContent}>
      <Routes>
        <Route path="/" element={<SwapView />} />
        <Route path="/liquidity" element={<LiquidityView />} />
        <Route path="/pools" element={<PoolsView />} />
      </Routes>
    </div>
  )
}

export default PageViewer
