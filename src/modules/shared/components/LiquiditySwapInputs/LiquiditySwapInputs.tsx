import { ReactElement } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { CombinedTokenInput } from 'modules/shared'
import { LiquiditySwapInput } from './LiquiditySwapInput'

export type IProps = {
  tokenInput: CombinedTokenInput
  label: string
  withBalanceLabel?: boolean
  withMax?: boolean
  onChange: (value: string) => void
  onBtnClick: () => void
  onMaxClick?: () => void
}

export type LiquiditySwapInputsProps = {
  input0Props: IProps
  input1Props: IProps
  icon: ReactElement
}
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'relative',
  },
  toInputContainer: {
    marginTop: theme.spacing(2),
  },
  iconContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 'calc(50% + 4px)',
    left: '40%',
    [theme.breakpoints.down('xs')]: {
      left: '20%',
    },
  },
  input1Container: {
    marginTop: theme.spacing(2),
  },
}))

export const LiquiditySwapInputs = (props: LiquiditySwapInputsProps) => {
  const { input0Props, input1Props, icon } = props
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={2} className={classes.mainContainer} justifyContent="space-between">
        <LiquiditySwapInput {...input0Props} />
        <div className={classes.iconContainer}>{icon}</div>
        <LiquiditySwapInput {...input1Props} className={classes.input1Container} />
      </Grid>
    </>
  )
}
