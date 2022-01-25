import { useState } from 'react'

export const usePopoverAnchor = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLSpanElement) | null>(null)

  const isOpen = Boolean(anchorEl)
  const close = () => setAnchorEl(null)

  return {
    isOpen,
    anchorEl,
    close,
    setAnchorEl,
  }
}
