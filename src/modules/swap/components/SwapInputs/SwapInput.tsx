import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import BaseInput from 'components/BaseInput'
import BaseButton from 'components/BaseButton'
import { TokenButton } from 'modules/shared'
import { BORDER_RADIUS5, COLOR_WHITE, xsButton } from 'helpers/themeHelper'
import { CombinedTokenInput } from 'modules/swap/types'

export interface SwapInputProps {
  onChange: (value: string) => void
  onBtnClick: () => void
  onMaxClick?: () => void
  label: string
  className?: string
  withBalanceLabel?: boolean
  withMax?: boolean
  tokenInput: CombinedTokenInput
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    alignItems: 'end',
  },
  inputLabelBox: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    background: COLOR_WHITE,
    borderRadius: BORDER_RADIUS5,
    '& fieldset': {
      borderRadius: BORDER_RADIUS5,
      borderColor: 'rgba(0,0,0,0.1)',
    },
  },
  maxButton: {
    ...xsButton,
    marginLeft: theme.spacing(1),
    boxShadow: 'none',
    background: COLOR_WHITE,
  },
  underlineEl: {
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
}))

export const SwapInput = ({
  onBtnClick,
  onMaxClick,
  className,
  withBalanceLabel,
  withMax = true,
  tokenInput,
  onChange,
  label,
}: SwapInputProps) => {
  const classes = useStyles()

  const { balance, amount, token } = tokenInput

  return (
    <>
      <Grid item xs={8} sm={9} className={className}>
        <BaseInput
          rtl
          numeric
          max={10000000}
          min={0}
          className={classes.input}
          value={amount}
          onChange={onChange}
          variant="outlined"
          placeholder="0.0"
          fullWidth
          label={
            <Box className={classes.inputLabelBox}>
              <Typography variant="body1">{label}</Typography>
              <Box>
                {token && withBalanceLabel ? (
                  <Typography variant="caption" color="textSecondary">
                    Balance: {balance}
                  </Typography>
                ) : null}
                {balance && withMax ? (
                  <BaseButton size="small" onClick={onMaxClick} className={classes.maxButton}>
                    <Typography variant="caption">max</Typography>
                  </BaseButton>
                ) : null}
              </Box>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={4} sm={3} className={classes.buttonContainer}>
        <TokenButton onClick={onBtnClick} token={token} />
      </Grid>
    </>
  )
}
