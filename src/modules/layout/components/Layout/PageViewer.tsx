import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'hooks'
import { ROUTES } from 'modules/layout/constants'

// Views
import SwapView from 'modules/swap'
import LiquidityView from 'modules/liquidity'
import { MyPools as MyPoolsView, AllPools as AllPoolsView, PoolView } from 'modules/pools'

const useStyles = makeStyles((theme) => ({
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
        <Route path="/my-pools" element={<MyPoolsView />} />
        <Route path="/all-pools" element={<AllPoolsView />} />
        <Route path="/pool/:poolId" element={<PoolView />} />
      </Routes>
    </div>
  )
}

export default PageViewer
