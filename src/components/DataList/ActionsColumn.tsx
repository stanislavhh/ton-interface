import { ReactElement } from 'react'
import { Grid, Icon, makeStyles } from '@material-ui/core'
import BaseButton from 'components/BaseButton'
import BaseMenu from 'components/BaseMenu'
import { BORDER_RADIUS4 } from 'helpers/themeHelper'
import { usePopoverAnchor } from 'hooks'

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

export const ActionsColumn = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const classes = useStyles()
  const { anchorEl, close, isOpen, setAnchorEl } = usePopoverAnchor()

  return (
    <Grid item xs={1} className={classes.actionsContainer}>
      <BaseButton className={classes.moreButton} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Icon fontSize="small" color="disabled">
          more_vert
        </Icon>
      </BaseButton>
      <BaseMenu
        open={isOpen}
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
      </BaseMenu>
    </Grid>
  )
}
