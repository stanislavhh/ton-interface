import CardContainer from 'modules/shared/components/CardContainer'
import { CircularProgress, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
}))
export const PoolNotFound = ({ loading }: { loading: boolean }) => {
  const classes = useStyles()
  return (
    <CardContainer xs={12} md={12} cardClass={classes.card}>
      {loading ? (
        <CircularProgress size={32} />
      ) : (
        <Typography variant="body2">We couldn't load this pool, please try again</Typography>
      )}
    </CardContainer>
  )
}
