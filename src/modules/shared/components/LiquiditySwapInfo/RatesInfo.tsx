import { Grid, Box, Icon, makeStyles, Typography } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'
import { useState } from 'react'

interface RatesInfoProps {
  rate: string
  i0Symbol: string | undefined
  i1Symbol: string | undefined
  price?: string
}

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  refreshPriceIcon: {
    ...iconsTransition,
    marginLeft: theme.spacing(1),
  },
  $text: {
    display: 'block',
    textAlign: 'right',
  },
}))

export const RatesInfo = ({ rate, i0Symbol, i1Symbol, price }: RatesInfoProps) => {
  const classes = useStyles()

  const hide = !i0Symbol || !i1Symbol

  const [isInverted, invertRate] = useState(false)

  const localRate = String(!isInverted ? rate : (1 / Number(rate)).toFixed(6))
  const symbol0 = isInverted ? i1Symbol : i0Symbol
  const symbol1 = isInverted ? i0Symbol : i1Symbol

  return (
    <Grid item xs={12} className={classes.rowContainer}>
      <Typography variant="body2">Rate</Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        {hide ? (
          '-'
        ) : (
          <>
            <Box>
              <Typography variant="body2">{`1 ${symbol0} = ${localRate} ${symbol1}`}</Typography>
              {price ? (
                <Typography variant="caption" color="textSecondary" className={classes.$text}>
                  ≈ ${price}
                </Typography>
              ) : null}
            </Box>
            <Icon color="primary" onClick={() => invertRate(!isInverted)} className={classes.refreshPriceIcon}>
              cached_sharp
            </Icon>
          </>
        )}
      </Box>
    </Grid>
  )
}
