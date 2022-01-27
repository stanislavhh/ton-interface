import { ReactNode } from 'react'
import { Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import BaseTooltip from 'components/BaseTooltip'

interface RowInfoProps {
  variant: Variant
  variantValue?: Variant
  label: string | ReactNode
  value?: string
  children?: ReactNode | ReactNode[]
  tooltip?: string
  className?: string
}

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  helpIcon: {
    fontSize: '16px',
    marginLeft: theme.spacing(1),
  },
}))

export const RowInfo = ({ variant, value, variantValue, label, tooltip, children, className }: RowInfoProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={`${classes.rowContainer} ${className || ''}`}>
      <Typography variant={variant}>
        {label}
        {tooltip ? (
          <BaseTooltip title={tooltip}>
            <Icon className={classes.helpIcon}>info_outlined</Icon>
          </BaseTooltip>
        ) : null}
      </Typography>
      {children ? children : <Typography variant={variantValue || variant}>{value}</Typography>}
    </Grid>
  )
}
