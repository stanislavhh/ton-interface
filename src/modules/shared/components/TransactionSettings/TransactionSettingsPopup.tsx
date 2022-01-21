import { useCallback } from 'react'
import { Popover, Grid, Switch, Box, Typography, PopoverProps, makeStyles, Icon } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'hooks'
import { $transactionSettings } from 'modules/layout/selectors'
import { BORDER_RADIUS1 } from 'helpers/themeHelper'
import BaseInput from 'components/BaseInput'
import BaseTooltip from 'components/BaseTooltip'
import { setTransactionSettings, TransactionSettings } from 'modules/layout'

const useStyles = makeStyles((theme) => ({
  root: {
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: ({ open }: { open: boolean }) => `rgba(0, 0,0, ${open ? '0.25' : '0'})`,
  },
  popover: {
    borderRadius: BORDER_RADIUS1,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(100px)',
    boxShadow: 'none',
  },
  boxContainer: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  gridContainer: {
    maxWidth: '500px',
  },
  gridIContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  switchContainer: {
    justifyContent: 'flex-end',
  },
  iconInfo: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  autoLabel: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

export const TransactionSettingsPopup = (props: PopoverProps) => {
  const { open, ...rest } = props
  const classes = useStyles({ open })
  const dispatch = useAppDispatch()

  const transactionSettings = useAppSelector($transactionSettings)

  const handleTSettingsChange = useCallback(
    (data: Partial<TransactionSettings>) => {
      dispatch(
        setTransactionSettings({
          ...transactionSettings,
          ...data,
        }),
      )
    },
    [dispatch, transactionSettings],
  )

  return (
    <Popover {...rest} open={open} classes={{ paper: classes.popover, root: classes.root }}>
      <Box className={classes.boxContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h4">Settings</Typography>
          </Grid>
          <Grid item xs={7} sm={6} md={7} className={classes.gridIContainer}>
            <BaseTooltip title="A higher percentage will allow you to make transactions faster but it takes more fee">
              <Icon className={classes.iconInfo} fontSize="small">
                info_outlined
              </Icon>
            </BaseTooltip>
            <Typography variant="body2">Slippage Tolerance, %:</Typography>
          </Grid>
          <Grid item xs={3} md={2} className={classes.gridIContainer}>
            <BaseInput
              value={transactionSettings.slippageTolerance}
              onChange={(value) => handleTSettingsChange({ slippageTolerance: value })}
              rtl
              numeric
              max={99}
              min={0}
              precision={2}
              variant="filled"
              disabled={transactionSettings.autoTolerance}
              placeholder="%"
              otherSizes="extra-sm"
            />
          </Grid>
          <Grid item xs={2} sm={3} className={`${classes.gridIContainer} ${classes.switchContainer}`}>
            <Switch
              color="primary"
              checked={transactionSettings.autoTolerance}
              onChange={({ target: { checked } }) => handleTSettingsChange({ autoTolerance: checked })}
            />
            <Typography className={classes.autoLabel} variant="caption">
              Auto
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} md={7} className={classes.gridIContainer}>
            <BaseTooltip title="Transaction will be declined after the provided amount of minutes">
              <Icon className={classes.iconInfo} fontSize="small">
                info_outlined
              </Icon>
            </BaseTooltip>
            <Typography variant="body2">Transaction Decline, minutes:</Typography>
          </Grid>
          <Grid item xs={3} md={2} className={classes.gridIContainer}>
            <BaseInput
              value={transactionSettings.transactionDeclineTime}
              onChange={(value) => handleTSettingsChange({ transactionDeclineTime: value })}
              max={180}
              min={5}
              rtl
              numeric
              variant="filled"
              otherSizes="extra-sm"
            />
          </Grid>
        </Grid>
      </Box>
    </Popover>
  )
}
