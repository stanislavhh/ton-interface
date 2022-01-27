import { ForwardedRef, forwardRef } from 'react'
import { makeStyles, MenuItem, Typography } from '@material-ui/core'
import { toggleDialog } from 'modules/pools/slice'
import { Dialogs } from 'modules/pools/enums'
import { PoolSelector, WalletPoolsSelector } from 'modules/pools/types'
import { useAppDispatch, useRouter } from 'hooks'

export const useStyles = makeStyles((theme) => ({
  menuItem: {
    minWidth: '180px',
    paddingBlock: theme.spacing(1.5),
  },
}))

export const ActionItems = forwardRef(
  (
    {
      pool,
      withRemove = false,
    }: {
      pool: PoolSelector | WalletPoolsSelector
      withRemove?: boolean
    },
    ref?: ForwardedRef<unknown>,
  ) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const classes = useStyles()

    return (
      <>
        <MenuItem className={classes.menuItem} onClick={() => router.navigate(`/pool/${pool.id}`)}>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => dispatch(toggleDialog({ type: Dialogs.ADD_LIQUIDITY, pool }))}
        >
          <Typography variant="body2">Add Liquidity</Typography>
        </MenuItem>
        {withRemove && (
          <MenuItem
            className={classes.menuItem}
            onClick={() => dispatch(toggleDialog({ type: Dialogs.REMOVE_LIQUIDITY, pool }))}
          >
            <Typography variant="body2">Remove Liquidity</Typography>
          </MenuItem>
        )}
      </>
    )
  },
)
