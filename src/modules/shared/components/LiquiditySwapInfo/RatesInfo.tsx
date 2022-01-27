import { Grid, Box, Icon, makeStyles, Typography } from '@material-ui/core'
import { iconsTransition } from 'helpers/themeHelper'
import { useState } from 'react'
import { Variant } from '@material-ui/core/styles/createTypography'

interface RatesInfoProps {
  rate: string
  i0Symbol: string | undefined
  i1Symbol: string | undefined
  price?: string
  className?: string
  labelClassName?: string
  variant?: Variant
  variantValue?: Variant
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

export const RatesInfo = ({
  rate,
  variant = 'body2',
  variantValue,
  i0Symbol,
  i1Symbol,
  className,
  labelClassName,
  price,
}: RatesInfoProps) => {
  const classes = useStyles()

  const hide = !i0Symbol || !i1Symbol

  const [isInverted, invertRate] = useState(false)

  const localRate = String(!isInverted ? rate : (1 / Number(rate)).toFixed(6))
  const symbol0 = isInverted ? i1Symbol : i0Symbol
  const symbol1 = isInverted ? i0Symbol : i1Symbol

  return (
    <Grid item xs={12} className={`${classes.rowContainer} ${className || ''}`}>
      <Typography variant={variant} className={labelClassName}>
        Rate
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        {hide ? (
          '-'
        ) : (
          <>
            <Box>
              <Typography variant={variantValue || variant}>{`1 ${symbol0} = ${localRate} ${symbol1}`}</Typography>
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
