import { Box, Grid, Typography, GridProps } from '@material-ui/core'

export interface RowColumnProps extends GridProps {
  value: string
  display: any
}

export const RowColumn = ({ value, ...rest }: RowColumnProps) => {
  return (
    <Grid {...rest} item component={Box}>
      <Typography variant="caption">{value}</Typography>
    </Grid>
  )
}
