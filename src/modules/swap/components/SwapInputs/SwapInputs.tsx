import { ReactElement } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Inputs } from 'modules/swap/enums'
import { InputType, CombinedTokenInput, ChangeAmountEvent } from 'modules/swap/types'
import { SwapInput } from './SwapInput'

export type ClickBtnEvent = { type: Inputs }

export type SwapInputsProps = {
  toInput: CombinedTokenInput
  fromInput: CombinedTokenInput
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
  },
}))

export const SwapInputs = (props: SwapInputsProps) => {
  const { fromInput, toInput, onAmountChange, onTokenBtnClick, onMaxClick, icon } = props
  const classes = useStyles()

  const getInputHandler = (type: InputType) => (value: string) => onAmountChange({ type, amount: value as string })

  const getTokenHandler = (type: InputType) => () => onTokenBtnClick({ type })

  const onMaxClickHandler = (type: InputType) => () => onMaxClick?.({ type })

  return (
    <>
      <Grid container spacing={2} className={classes.mainContainer} justifyContent="space-between">
        <SwapInput
          label="From"
          withBalanceLabel
          onChange={getInputHandler(Inputs.INPUT_FROM)}
          onBtnClick={getTokenHandler(Inputs.INPUT_FROM)}
          onMaxClick={onMaxClickHandler(Inputs.INPUT_FROM)}
          tokenInput={fromInput}
        />
        <div className={classes.iconContainer}>{icon}</div>
        <SwapInput
          label="To"
          withMax={false}
          withBalanceLabel
          className={classes.toInputContainer}
          onChange={getInputHandler(Inputs.INPUT_TO)}
          onBtnClick={getTokenHandler(Inputs.INPUT_TO)}
          tokenInput={toInput}
        />
      </Grid>
    </>
  )
}
