import { useTheme, useMediaQuery } from '@material-ui/core'
import { useMemo } from 'react'

export const useMobilePoint = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  return useMemo(() => isMobile, [isMobile])
}

export const useTabletPoint = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.between('xs', 'sm'))

  return useMemo(() => isTablet, [isTablet])
}

export const useLandscapeTabletPoint = () => {
  const theme = useTheme()
  const isLandScapeTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  return useMemo(() => isLandScapeTablet, [isLandScapeTablet])
}

export const useDesktopPoint = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return useMemo(() => isDesktop, [isDesktop])
}
