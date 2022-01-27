import { CSSProperties } from 'react'
import { Box, Grid } from '@material-ui/core'
import { WalletPoolsSelector } from 'modules/pools/types'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { usdFormatter } from 'helpers/formatterHelper'
import { RowColumn, ActionsColumn } from 'components/DataList'
import { ActionItems } from 'modules/pools/components/ListComponents'
import { useRowStyles } from 'modules/pools/components/ListComponents/styles'

export interface PoolRowProps {
  data: WalletPoolsSelector[]
  style: CSSProperties
  index: number
}

export const PoolRow = ({ data, style, index }: PoolRowProps) => {
  const classes = useRowStyles()
  const { name, poolShare, feeTier, myLiquidity, dailyIncome, token0LogoURI, token1LogoURI, apr } = data[index]

  return (
    <Box style={style} className={classes.poolItemBox}>
      <Grid container className={classes.poolItem}>
        <Grid xs={2} sm={1} item component={Box} className={classes.flexCenter}>
          <Box width={55} height={40}>
            <LPAvatar avatar0={token0LogoURI} avatar1={token1LogoURI} size={32} />
          </Box>
        </Grid>
        <RowColumn xs={5} sm={2} display={{ xs: 'flex' }} value={name} />
        <RowColumn
          sm={2}
          md={1}
          display={{ xs: 'none', sm: 'flex' }}
          value={`${feeTierToPercentage(feeTier)} %`}
          className={classes.flexCenter}
        />
        <RowColumn
          md={2}
          display={{ xs: 'none', md: 'flex' }}
          value={`${poolShare} %`}
          className={classes.flexCenter}
        />
        <RowColumn
          sm={3}
          md={2}
          display={{ xs: 'none', sm: 'flex' }}
          value={usdFormatter.format(Number(myLiquidity))}
          className={classes.flexCenter}
        />
        <RowColumn
          xs={4}
          sm={3}
          md={2}
          display={{ xs: 'flex' }}
          value={usdFormatter.format(Number(dailyIncome))}
          className={classes.flexCenter}
        />
        <RowColumn md={1} display={{ xs: 'none', md: 'flex' }} value={`${apr} %`} className={classes.flexCenter} />
        <ActionsColumn>
          <ActionItems pool={data[index]} withRemove />
        </ActionsColumn>
      </Grid>
    </Box>
  )
}
