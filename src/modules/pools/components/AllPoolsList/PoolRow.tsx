import { CSSProperties } from 'react'
import { Box, Grid } from '@material-ui/core'
import { PoolSelector } from 'modules/pools/types'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { usdFormatter } from 'helpers/formatterHelper'
import { useRowStyles, RowColumn, ActionsColumn } from 'components/DataList'
import { ActionItems } from 'modules/pools/components/ListComponents'

export interface PoolRowProps {
  data: PoolSelector[]
  style: CSSProperties
  index: number
}

export const PoolRow = ({ data, style, index }: PoolRowProps) => {
  const classes = useRowStyles()
  const { name, liquidity, feeTier, token0LogoURI, token1LogoURI, volumeUSD, apr } = data[index]

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
          sm={1}
          md={2}
          display={{ xs: 'none', sm: 'flex' }}
          className={classes.flexCenter}
          value={`${feeTierToPercentage(feeTier)} %`}
        />
        <RowColumn
          sm={3}
          md={2}
          display={{ xs: 'none', sm: 'flex' }}
          className={classes.flexCenter}
          value={usdFormatter.format(Number(liquidity))}
        />
        <RowColumn
          sm={3}
          md={2}
          display={{ xs: 'none', sm: 'flex' }}
          className={classes.flexCenter}
          value={usdFormatter.format(Number(volumeUSD))}
        />
        <RowColumn xs={4} sm={1} md={2} display={{ xs: 'flex' }} className={classes.flexCenter} value={`${apr} %`} />
        <ActionsColumn>
          <ActionItems pool={data[index]} />
        </ActionsColumn>
      </Grid>
    </Box>
  )
}
