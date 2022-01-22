import { Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import BaseTooltip from 'components/BaseTooltip'
import { iconsTransition } from 'helpers/themeHelper'

interface RowInfoProps {
  variant: Variant
  label: string
  value: string
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
    fontSize: '20px',
    marginLeft: theme.spacing(1),
  },
}))

export const RowInfo = ({ variant, value, label, tooltip, className }: RowInfoProps) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={`${classes.rowContainer} ${className || ''}`}>
      <Typography variant={variant}>
        {label}
        <BaseTooltip title={tooltip || ''}>
          <Icon color="disabled" className={classes.helpIcon}>
            info_outlined
          </Icon>
        </BaseTooltip>
      </Typography>
      <Typography variant={variant}>{value}</Typography>
    </Grid>
  )
}
