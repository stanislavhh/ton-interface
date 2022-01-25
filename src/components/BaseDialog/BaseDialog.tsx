import React, { ReactNode } from 'react'
import { Dialog, DialogProps, Grid, Icon, Typography, makeStyles } from '@material-ui/core'
import BackdropLoader from 'components/BackdropLoader'
import { BORDER_RADIUS1, iconsTransition } from 'helpers/themeHelper'

export interface BaseDialogProps extends DialogProps {
  onClose?: (event: {}, reason: 'closeIcon' | 'backdropClick' | 'escapeKeyDown') => void
  showBackdropLoader?: boolean
  backdropText?: ReactNode | string
  titleElement?: ReactNode
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      margin: theme.spacing(2),
      borderRadius: BORDER_RADIUS1,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
    },
  },
  gridContainer: {
    paddingBlock: theme.spacing(2.5),
    paddingInline: theme.spacing(3),
  },
  headContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    color: theme.palette.grey.A400,
    ...iconsTransition,
  },
}))

export const BaseDialog = (props: BaseDialogProps): JSX.Element => {
  const { title, titleElement, className, children, onClose, backdropText, showBackdropLoader, ...rest } = props
  const classes = useStyles()

  return (
    <Dialog className={`${classes.dialog} ${className || ''}`} onClose={onClose} {...rest}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} className={classes.headContainer}>
          {titleElement ? titleElement : <Typography variant="h4">{title}</Typography>}
          <Icon onClick={(e) => onClose?.(e, 'closeIcon')} className={classes.closeIcon}>
            close
          </Icon>
        </Grid>
        {children}
      </Grid>
      <BackdropLoader open={showBackdropLoader} text={backdropText} />
    </Dialog>
  )
}
