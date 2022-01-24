import { makeStyles } from '@material-ui/core'
import { BORDER_RADIUS2, BORDER_RADIUS4 } from 'helpers/themeHelper'

export const useRowStyles = makeStyles((theme) => ({
  poolItemBox: {
    background: 'none',
  },
  poolItem: {
    height: '52px',
    background: 'rgba(235,235,235, 0.2)',
    paddingInline: theme.spacing(2),
    borderRadius: BORDER_RADIUS2,
    alignItems: 'center',
  },
  flexCenter: {
    justifyContent: 'center',
  },
}))

export const useHeaderStyles = makeStyles((theme) => ({
  poolHeader: {
    paddingInline: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    alignItems: 'center',
  },
  flexCenter: {
    justifyContent: 'center',
  },
  headerTypo: {
    marginRight: theme.spacing(0.5),
  },
}))
