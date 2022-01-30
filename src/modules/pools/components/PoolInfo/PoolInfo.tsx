import { useState } from 'react'
import CardContainer from 'modules/shared/components/CardContainer'
import { Avatar, Box, Grid, Icon, Typography } from '@material-ui/core'
import { isPoolInUsersWalletList } from 'modules/pools/utils'
import { RowInfo, RatesInfo } from 'modules/shared/components/LiquiditySwapInfo'
import { feeTierToPercentage } from 'modules/liquidity/utils'
import { usdFormatter } from 'helpers/formatterHelper'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $selectedPool } from 'modules/pools/selectors'
import { Variant } from '@material-ui/core/styles/createTypography'
import { WalletPoolsSelector } from 'modules/pools/types'
import { usePoolInfoStyles as useStyles } from 'modules/pools/components/PoolInfo/styles'
import BaseButton from 'components/BaseButton'
import { toggleDialog } from 'modules/pools/slice'
import { Dialogs } from 'modules/pools/enums'

export const PoolInfo = () => {
  const dispatch = useAppDispatch()
  const pool = useAppSelector($selectedPool)
  const [swap, toggleSwap] = useState(false)
  const classes = useStyles({ swap })
  const {
    feeTier,
    liquidity,
    token0,
    token1,
    rate,
    apr,
    volumeUSD,
    myLiquidity,
    poolShare,
    totalValueLockedToken0,
    token0LogoURI,
    token1LogoURI,
    totalValueLockedToken1,
    dailyIncome,
  } = (pool || {}) as WalletPoolsSelector
  const poolInUsersList = isPoolInUsersWalletList(pool)

  const commonRowProps = {
    variant: 'h6' as Variant,
    variantValue: 'body2' as Variant,
    className: classes.rowInfo,
  }

  const getLabel = (label: string) => (
    <Typography variant="body2" className={classes.infoLabel}>
      {label}
    </Typography>
  )

  const renderSwapIcon = () => {
    return (
      poolInUsersList && (
        <Icon className={classes.rotateIcon} onClick={() => toggleSwap(!swap)}>
          visibility
        </Icon>
      )
    )
  }

  const renderLiquidityButtons = () => (
    <Box display="flex" justifyContent="space-between" width="100%" mt={4}>
      <BaseButton
        variant="contained"
        size="large"
        color="primary"
        onClick={() => dispatch(toggleDialog({ type: Dialogs.ADD_LIQUIDITY, pool }))}
        className={classes.addLiquidityButton}
      >
        Add Liquidity
      </BaseButton>
      {poolInUsersList && (
        <BaseButton
          variant="outlined"
          color="primary"
          onClick={() => dispatch(toggleDialog({ type: Dialogs.REMOVE_LIQUIDITY, pool }))}
        >
          Remove Liquidity
        </BaseButton>
      )}
    </Box>
  )

  return (
    <CardContainer xs={12} md={6} lg={5} className="" cardClass={classes.card}>
      <Grid container className={classes.poolCardContainer}>
        {renderSwapIcon()}
        <RowInfo
          {...commonRowProps}
          label={getLabel('Fee Tier')}
          tooltip="Fee tier is setup automatically based on users choice. You may change it in tiers popup."
          value={`${feeTierToPercentage(feeTier)} %`}
        />
        <RowInfo
          {...commonRowProps}
          label={getLabel('APR')}
          tooltip="Estimated on trading volume, fee tier and liquidity"
          value={`${apr} %`}
        />
        <RatesInfo
          {...commonRowProps}
          variant="body2"
          labelClassName={classes.infoLabel}
          i0Symbol={token0?.symbol}
          i1Symbol={token1?.symbol}
          rate={String(rate)}
        />
        <RowInfo {...commonRowProps} label={getLabel('Liquidity')} value={usdFormatter.format(Number(liquidity))} />
        <RowInfo {...commonRowProps} label={getLabel('Volume 24h')} value={usdFormatter.format(Number(volumeUSD))} />
        <RowInfo {...commonRowProps} label={getLabel('Locked')}>
          <Box display="flex" alignItems="center">
            <Avatar src={token0LogoURI} className={classes.avatar} />
            <Typography variant="body2">{Number(totalValueLockedToken0).toFixed(4)}</Typography>
          </Box>
        </RowInfo>
        <RowInfo {...commonRowProps} value={`${Number(totalValueLockedToken1).toFixed(4)}`} label={getLabel('Locked')}>
          <Box display="flex" alignItems="center">
            <Avatar src={token1LogoURI} className={classes.avatar} />
            <Typography variant="body2">{Number(totalValueLockedToken1).toFixed(4)}</Typography>
          </Box>
        </RowInfo>
        {renderLiquidityButtons()}
      </Grid>
      <Grid container className={classes.myCardContainer}>
        {renderSwapIcon()}
        <RowInfo
          {...commonRowProps}
          label={getLabel('My Liquidity')}
          value={usdFormatter.format(Number(myLiquidity))}
        />
        <RowInfo {...commonRowProps} label={getLabel('Share of pool')} value={`${poolShare} %`} />
        <RowInfo {...commonRowProps} label={getLabel('Est. daily income')} value={usdFormatter.format(dailyIncome)} />
        {renderLiquidityButtons()}
      </Grid>
    </CardContainer>
  )
}
