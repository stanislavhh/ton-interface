import { useEffect, useState } from 'react'
import { Avatar, Box, Grid, Icon, makeStyles, Slider, Typography } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import BackdropLoader from 'components/BackdropLoader'
import { WalletPoolsSelector } from 'modules/pools'
import LPAvatar from 'modules/shared/components/LPAvatar'
import { usdFormatter } from 'helpers/formatterHelper'
import { RowInfo } from 'modules/shared/components/LiquiditySwapInfo'
import { useSliderStyles } from 'modules/liquidity/components/RemoveLiquidityDialog/useSliderStyles'
import ConfirmTransactionButton from 'modules/shared/components/ConfirmTransactionButton'
import ConfirmationTerms from 'modules/shared/components/ConfirmationTerms'
import BaseInput from 'components/BaseInput'

const useStyles = makeStyles((theme) => ({
  liquidityTitle: { marginRight: theme.spacing(1) },
  sliderContainer: {
    paddingTop: theme.spacing(5),
    display: 'flex',
  },
  sliderEnding: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
  },
  withdrawContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  confirmButton: {
    marginTop: theme.spacing(2),
  },
  withdrawLabel: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: '32px',
    height: '32px',
  },
  symbol: {
    marginInline: theme.spacing(1),
  },
  flex: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  infoContainer: {
    marginTop: theme.spacing(2.5),
  },
  slippageInput: {
    maxWidth: 80,
  },
}))

export interface RemoveLiquidityDialogProps extends BaseDialogProps {
  pool: WalletPoolsSelector | null
  confirm: () => void
  showBackdrop: boolean
  slippageTolerance: string
}

interface DialogState {
  withdrawUSD: string
  t0Amount: string
  t1Amount: string
  poolShare: string
  dailyIncome: string
  slippageTolerance: string
}

const initialState = {
  withdrawUSD: '',
  t0Amount: '',
  t1Amount: '',
  poolShare: '',
  dailyIncome: '',
  slippageTolerance: '',
}
const initialSlider = 35

export const RemoveLiquidityDialog = ({
  open,
  pool,
  slippageTolerance,
  confirm,
  showBackdrop,
  ...rest
}: RemoveLiquidityDialogProps) => {
  const classes = useStyles()
  const sliderClasses = useSliderStyles()
  const {
    poolShare,
    dailyIncome,
    token0LogoURI,
    token1Price,
    token0Price,
    totalValueLockedToken0,
    totalValueLockedToken1,
    token1LogoURI,
    token0,
    token1,
  } = pool || {}
  const totalT0AmountInPool = Number(totalValueLockedToken0) * Number(poolShare) * 0.5
  const totalT1AmountInPool = Number(totalValueLockedToken1) * Number(poolShare) * 0.5
  const [slider, setSlider] = useState(initialSlider)
  const [dialogState, setDialogState] = useState<DialogState>({ ...initialState, slippageTolerance })

  const renderToken = (logo?: string, symbol?: string, amount?: string, className?: string) => (
    <Grid item xs={5} className={`${classes.flex} ${className || ''}`}>
      <Avatar src={logo} className={classes.avatar} />
      <Typography variant="body2" className={classes.symbol}>
        {symbol}
      </Typography>
      <Typography variant="body2" style={{ position: 'relative' }}>
        {amount}
      </Typography>
    </Grid>
  )

  const handleChangeSlippage = (value: string) => {
    setDialogState((prevState) => ({
      ...prevState,
      slippageTolerance: value,
    }))
  }

  const calculateNextState = () => {
    const sliderPercentage = slider / 100
    setDialogState((prevState) => ({
      withdrawUSD: usdFormatter.format(
        (totalT0AmountInPool * Number(token0Price) + totalT1AmountInPool * Number(token1Price)) * sliderPercentage,
      ),
      t0Amount: (totalT0AmountInPool * sliderPercentage).toFixed(4),
      t1Amount: (totalT1AmountInPool * sliderPercentage).toFixed(4),
      poolShare: (Number(poolShare) * (1 - sliderPercentage)).toFixed(6),
      dailyIncome: usdFormatter.format(Number(dailyIncome) * (1 - sliderPercentage)),
      slippageTolerance: prevState.slippageTolerance ? prevState.slippageTolerance : slippageTolerance,
    }))
  }

  useEffect(calculateNextState, [slider])

  useEffect(() => {
    if (open) {
      calculateNextState()
    } else {
      setDialogState(initialState)
      setSlider(initialSlider)
    }
  }, [open])

  return (
    <BaseDialog
      fullWidth
      maxWidth="sm"
      open={open}
      {...rest}
      titleElement={
        <Box display="flex" alignItems="center">
          <Typography variant="h4" className={classes.liquidityTitle}>
            Remove
          </Typography>
          <LPAvatar avatar0={token0LogoURI} size={32} avatar1={token1LogoURI} />
          <Typography variant="h4" className={classes.liquidityTitle}>
            {token0?.symbol}/{token1?.symbol}
          </Typography>
        </Box>
      }
    >
      <BackdropLoader open={showBackdrop} text="Removing liquidity" />
      <Grid container justifyContent="center">
        <Grid item xs={10} className={classes.sliderContainer}>
          <Slider
            value={slider}
            classes={sliderClasses}
            marks={[
              { label: '25', value: 25 },
              { label: '50', value: 50 },
              { label: '75', value: 75 },
            ]}
            onChange={(e, next) => setSlider(next as number)}
            valueLabelDisplay="on"
          />
          <Typography variant="body2" className={classes.sliderEnding}>
            %
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.withdrawContainer}>
          <Typography variant="subtitle1" className={classes.withdrawLabel}>
            You withdraw
          </Typography>
          <Typography variant="caption" color="textSecondary">
            ≈ {dialogState.withdrawUSD}
          </Typography>
        </Grid>
        {renderToken(token0LogoURI, token0?.symbol, dialogState.t0Amount)}
        <Grid item xs={2} className={`${classes.flex} ${classes.justifyCenter}`}>
          <Icon color="primary">add</Icon>
        </Grid>
        {renderToken(token1LogoURI, token1?.symbol, dialogState.t1Amount, classes.justifyEnd)}
        <Grid item xs={12} className={classes.infoContainer}>
          <RowInfo
            variant="body2"
            label="Share of pool"
            tooltip="Your part in pool"
            value={`${dialogState.poolShare} %`}
          />
          <RowInfo
            variant="body2"
            label="Est. Daily Income"
            tooltip="Daily income estimated on current liquidity and APR of pool."
            value={dialogState.dailyIncome}
          />
          <RowInfo
            variant="body2"
            label="Slippage Tolerance %"
            tooltip="A higher percent of the slippage tolerance allows to complete a faster transaction, yet the less sum will be received to your account. You can manage slippage tolerance in settings"
          >
            <BaseInput
              otherSizes="extra-sm"
              className={classes.slippageInput}
              value={dialogState.slippageTolerance}
              onChange={handleChangeSlippage}
              variant="filled"
              rtl
              numeric
              max={99}
              min={0}
              precision={2}
            />
          </RowInfo>
        </Grid>
        <ConfirmTransactionButton
          text="Confirm"
          className={classes.confirmButton}
          canConfirm={slider !== 0}
          confirm={confirm}
        />
        <ConfirmationTerms />
      </Grid>
    </BaseDialog>
  )
}
