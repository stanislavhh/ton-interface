import { useAppDispatch, useAppSelector } from 'hooks'
import { $poolsDialog } from 'modules/pools/selectors'
import { toggleDialog } from 'modules/pools/slice'
import BaseDialog from 'components/BaseDialog'
import { Dialogs } from 'modules/pools/enums'

export const RemoveLiquidityDialog = () => {
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)

  const closeDialog = () => dispatch(toggleDialog({ type: '', pool: null }))

  return (
    <BaseDialog open={dialog.type === Dialogs.REMOVE_LIQUIDITY} onClose={closeDialog}>
      OK
    </BaseDialog>
  )
}
