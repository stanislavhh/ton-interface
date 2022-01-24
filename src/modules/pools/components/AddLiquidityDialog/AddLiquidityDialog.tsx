import { useAppDispatch, useAppSelector } from 'hooks'
import { $poolsDialog } from 'modules/pools/selectors'
import BaseDialog from 'components/BaseDialog'
import { Dialogs } from 'modules/pools/enums'
import { toggleDialog } from 'modules/pools/slice'

export const AddLiquidityDialog = () => {
  const dispatch = useAppDispatch()
  const dialog = useAppSelector($poolsDialog)

  const closeDialog = () => dispatch(toggleDialog({ type: '', pool: null }))

  return (
    <BaseDialog open={dialog.type === Dialogs.ADD_LIQUIDITY} onClose={closeDialog}>
      OK
    </BaseDialog>
  )
}
