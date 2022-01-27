import { GridSize } from '@material-ui/core'

export const transactionsGridConfig = {
  token0Amount: {
    sm: 2 as GridSize,
    display: { xs: 'none', sm: 'flex', md: 'none', lg: 'flex' },
  },
  token1Amount: {
    sm: 2 as GridSize,
    display: { xs: 'none', sm: 'flex', md: 'none', lg: 'flex' },
  },
  totalValue: {
    xs: 4 as GridSize,
    sm: 3 as GridSize,
    md: 4 as GridSize,
    lg: 3 as GridSize,
    display: { xs: 'flex' },
  },
  address: {
    xs: 4 as GridSize,
    sm: 3 as GridSize,
    md: 4 as GridSize,
    lg: 3 as GridSize,
    display: { xs: 'flex' },
  },
  date: {
    xs: 4 as GridSize,
    sm: 2 as GridSize,
    md: 4 as GridSize,
    lg: 2 as GridSize,
    display: { xs: 'flex' },
  },
}
