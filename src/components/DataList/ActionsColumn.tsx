import { Grid, Icon, makeStyles, Menu } from '@material-ui/core'
import BaseButton from 'components/BaseButton'
import { BORDER_RADIUS4 } from 'helpers/themeHelper'
import { ReactChildren, ReactElement, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
  },
  moreButton: {
    padding: theme.spacing(0.75),
    minWidth: '10px',
    borderRadius: BORDER_RADIUS4,
  },
}))

export const ActionsColumn = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLSpanElement) | null>(null)

  const close = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  return (
    <Grid item xs={1} className={classes.actionsContainer}>
      <BaseButton className={classes.moreButton} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Icon fontSize="small" color="disabled">
          more_vert
        </Icon>
      </BaseButton>
      <Menu
        open={open}
        classes={{ paper: classes.paper }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClick={close}
        onClose={close}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
      >
        {children}
      </Menu>
    </Grid>
  )
}
