import { useAppDispatch } from 'hooks'
import { toggleAlert } from 'modules/layout/slice'
import Tooltip from 'components/BaseTooltip'

export const Liquidity = () => {
  const dispatch = useAppDispatch()
  const showAlert = () => dispatch(toggleAlert({ type: 'success' }))

  return (
    <div>
      <div onClick={showAlert}>LIQUIDITY HERE</div>
      <Tooltip title="HELLO" placement="bottom-end">
        <div>TOOLTIP</div>
      </Tooltip>
    </div>
  )
}
