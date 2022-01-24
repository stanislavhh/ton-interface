import { Grid, Icon, makeStyles, Menu, MenuItem } from '@material-ui/core'
import BaseButton from 'components/BaseButton'
import { BORDER_RADIUS4 } from 'helpers/themeHelper'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  moreButton: {
    padding: theme.spacing(0.75),
    minWidth: '10px',
    borderRadius: BORDER_RADIUS4,
  },
}))

export const ActionsColumn = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLSpanElement) | null>(null)

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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
      >
        <MenuItem>Add Liquidity</MenuItem>
      </Menu>
    </Grid>
  )
}
