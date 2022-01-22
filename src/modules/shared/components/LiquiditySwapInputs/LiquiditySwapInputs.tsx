import { ReactElement } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Inputs, InputType } from 'modules/shared'
import { CombinedTokenInput } from 'modules/shared'
import { ChangeAmountEvent } from 'modules/swap/types'
import { LiquiditySwapInput } from './LiquiditySwapInput'

export type ClickBtnEvent = { type: InputType }

export type LiquiditySwapInputsProps = {
  input0: CombinedTokenInput
  input1: CombinedTokenInput
  onAmountChange: (e: ChangeAmountEvent) => void
  onTokenBtnClick: (e: ClickBtnEvent) => void
  onMaxClick?: (e: ClickBtnEvent) => void
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
    position: 'absolute',
    top: 'calc(50% + 4px)',
    left: '40%',
    [theme.breakpoints.down('sm')]: {
      left: '30%',
    },
  },
}))

export const LiquiditySwapInputs = (props: LiquiditySwapInputsProps) => {
  const { input0, input1, onAmountChange, onTokenBtnClick, onMaxClick, icon } = props
  const classes = useStyles()

  const getInputHandler = (type: InputType) => (value: string) => onAmountChange({ type, amount: value as string })

  const getTokenHandler = (type: InputType) => () => onTokenBtnClick({ type })

  const onMaxClickHandler = (type: InputType) => () => onMaxClick?.({ type })

  return (
    <>
      <Grid container spacing={2} className={classes.mainContainer} justifyContent="space-between">
        <LiquiditySwapInput
          label="From"
          withBalanceLabel
          onChange={getInputHandler(Inputs.INPUT_0)}
          onBtnClick={getTokenHandler(Inputs.INPUT_0)}
          onMaxClick={onMaxClickHandler(Inputs.INPUT_0)}
          tokenInput={input0}
        />
        <div className={classes.iconContainer}>{icon}</div>
        <LiquiditySwapInput
          label="To"
          withMax={false}
          withBalanceLabel
          className={classes.toInputContainer}
          onChange={getInputHandler(Inputs.INPUT_1)}
          onBtnClick={getTokenHandler(Inputs.INPUT_1)}
          tokenInput={input1}
        />
      </Grid>
    </>
  )
}
