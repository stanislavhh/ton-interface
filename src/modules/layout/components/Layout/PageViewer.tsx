import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useRouter } from 'hooks'

import './transition.css'

// Views
import SwapView from 'modules/swap'
import LiquidityView from 'modules/liquidity'
import PoolsView from 'modules/pools'

const useStyles = makeStyles(() => ({
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
}))

export const PageViewer = (): JSX.Element => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <TransitionGroup>
      <CSSTransition key={router.pathname} classNames={classes} timeout={300}>
        <Routes>
          <Route path="/" element={<SwapView />} />
          <Route path="/liquidity" element={<LiquidityView />} />
          <Route path="/pools" element={<PoolsView />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageViewer
