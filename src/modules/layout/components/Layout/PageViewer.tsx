import { Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useRouter } from 'hooks'

import './transition.css'

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
    marginTop: theme.spacing(8),
    paddingInline: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
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
  return (
    <TransitionGroup className={pageContent}>
      <CSSTransition key={router.pathname} classNames={rest} timeout={300}>
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
