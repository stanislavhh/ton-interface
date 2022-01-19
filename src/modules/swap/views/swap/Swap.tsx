import { ChangeEventHandler } from 'react'
import { Card, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import BaseInput from 'components/BaseInput'
import TokenButton from 'modules/swap/components/TokenButton'
import TokensListDialog from 'modules/swap/components/TokensListDialog'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setAmount, setDialog, swapInputs } from 'modules/swap/slice'
import { InputType } from 'modules/swap/types'
import { $dialog, $inputFrom, $inputTo } from 'modules/swap/selectors'
import { Dialogs, Inputs } from 'modules/swap/enums'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3),
  },
  cardContainer: {
    marginTop: theme.spacing(2),
  },
  card: {
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'end',
  },
  refreshContainer: {
    marginTop: theme.spacing(2),
  },
  refreshIcon: {
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform ease-in 0.15s',

    '&:hover': {
      transform: 'rotate(60deg)',
    },
  },
}))

export const Swap = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { token: tokenFrom, amount: amountFrom } = useAppSelector($inputFrom)
  const { token: tokenTo, amount: amountTo } = useAppSelector($inputTo)
  const dialog = useAppSelector($dialog)

  const getInputHandler =
    (type: InputType): ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
    ({ target: { value } }) =>
      dispatch(setAmount({ type, amount: value }))

  const getTokenHandler = (type: InputType) => () => dispatch(setDialog({ input: type, type: Dialogs.TOKENS_LIST }))

  const closeDialog = () => dispatch(setDialog({ type: '' }))

  return (
    <Grid container justifyContent="center">
      <TokensListDialog open={dialog.type === Dialogs.TOKENS_LIST} onClose={closeDialog} />
      <Grid item xs={12} md={9}>
        <Typography variant="h1" className={classes.title}>
          Swap
        </Typography>
      </Grid>
      <Grid item xs={12} md={9} className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={8}>
              <BaseInput
                value={amountFrom}
                onChange={getInputHandler(Inputs.INPUT_FROM)}
                variant="outlined"
                placeholder="0.0"
                fullWidth
                label="From"
              />
            </Grid>
            <Grid item xs={4} className={classes.buttonContainer}>
              <TokenButton onClick={getTokenHandler(Inputs.INPUT_FROM)} token={tokenFrom} />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6} className={classes.refreshContainer}>
              <Icon color="primary" onClick={() => dispatch(swapInputs())} className={classes.refreshIcon}>
                cached_sharp
              </Icon>
            </Grid>
            <Grid item xs={8}>
              <BaseInput
                value={amountTo}
                onChange={getInputHandler(Inputs.INPUT_TO)}
                variant="outlined"
                placeholder="0.0"
                fullWidth
                label="To"
              />
            </Grid>
            <Grid item xs={4} className={classes.buttonContainer}>
              <TokenButton onClick={getTokenHandler(Inputs.INPUT_TO)} token={tokenTo} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}
