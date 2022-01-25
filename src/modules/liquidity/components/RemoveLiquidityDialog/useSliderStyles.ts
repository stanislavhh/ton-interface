import { makeStyles } from '@material-ui/core'
import { BORDER_RADIUS3, COLOR_TEXT } from 'helpers/themeHelper'

export const useSliderStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 'unset',
  },
  rail: {
    height: '10px',
    borderRadius: BORDER_RADIUS3,
  },
  track: {
    height: '10px',
    borderRadius: BORDER_RADIUS3,
  },
  thumb: {
    top: '15px',
    height: '16px',
    width: '16px',
  },
  mark: {
    opacity: 0,
  },
  valueLabel: {
    top: '-26px',
    left: 'calc(50% - 15px)',
    '& span': {
      color: COLOR_TEXT,
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
}))
