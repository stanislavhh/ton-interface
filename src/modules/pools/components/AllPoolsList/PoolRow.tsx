import { CSSProperties } from 'react'
import { Box, Grid, makeStyles, GridJustification, Typography, Icon } from '@material-ui/core'
import { PoolWithLogo } from 'modules/pools/types'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { BORDER_RADIUS2, BORDER_RADIUS4 } from 'helpers/themeHelper'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { usdFormatter } from 'helpers/formatterHelper'
import BaseButton from 'components/BaseButton'

export interface PoolRowProps {
  data: PoolWithLogo[]
  style: CSSProperties
  index: number
}

const useStyles = makeStyles((theme) => ({
  poolItemBox: {
    background: 'none',
  },
  poolItem: {
    height: '52px',
    background: 'rgba(235,235,235, 0.2)',
    paddingInline: theme.spacing(2),
    borderRadius: BORDER_RADIUS2,
    alignItems: 'center',
  },
  flexCenter: {
    justifyContent: 'center',
  },
  addLiquidityButton: {
    padding: theme.spacing(0.75),
    minWidth: '10px',
    borderRadius: BORDER_RADIUS4,
  },
  avatar0: {
    width: '32px',
    height: '32px',
  },
  avatar1: {
    width: '24px',
    height: '24px',
  },
}))
export const PoolRow = ({ data, style, index }: PoolRowProps) => {
  const classes = useStyles()
  const { token0, token1, liquidity, feeTier, token0LogoURI, token1LogoURI, volumeUSD, apr } = data[index]

  return (
    <Box style={style} className={classes.poolItemBox}>
      <Grid container className={classes.poolItem}>
        <Grid xs={2} sm={1} item component={Box} className={classes.flexCenter}>
          <Box width={55} height={40}>
            <LPAvatar avatar0={token0LogoURI} avatar1={token1LogoURI} size={32} />
          </Box>
        </Grid>
        <Grid xs={5} sm={2} md={2} display={{ xs: 'flex' }} item component={Box}>
          <Typography variant="caption">
            {token0.symbol}/{token1.symbol}
          </Typography>
        </Grid>
        <Grid sm={1} md={1} display={{ xs: 'none', sm: 'flex' }} className={classes.flexCenter} item component={Box}>
          <Typography variant="caption">{feeTierToPercentage(feeTier)} %</Typography>
        </Grid>
        <Grid sm={3} md={2} display={{ xs: 'none', sm: 'flex' }} item component={Box} className={classes.flexCenter}>
          <Typography variant="caption">{usdFormatter.format(Number(liquidity))}</Typography>
        </Grid>
        <Grid sm={3} md={2} display={{ xs: 'none', sm: 'flex' }} item component={Box} className={classes.flexCenter}>
          <Typography variant="caption">{usdFormatter.format(Number(volumeUSD))}</Typography>
        </Grid>
        <Grid xs={3} sm={1} md={1} display={{ xs: 'flex' }} item component={Box} className={classes.flexCenter}>
          <Typography variant="caption">{apr} %</Typography>
        </Grid>
        <Grid
          xs={2}
          sm={1}
          md={3}
          display={{ xs: 'flex' }}
          justifyContent={'flex-end' as GridJustification}
          item
          component={Box}
        >
          <BaseButton variant="contained" color="primary" className={classes.addLiquidityButton}>
            <Icon fontSize="small">add</Icon>
          </BaseButton>
        </Grid>
      </Grid>
    </Box>
  )
}