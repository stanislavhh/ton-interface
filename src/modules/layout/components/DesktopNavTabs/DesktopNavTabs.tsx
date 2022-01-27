import React from 'react'
import { Tabs, Tab, makeStyles } from '@material-ui/core'
import { BaseLink } from 'components/BaseLink'
import { NAV_LINKS } from 'modules/layout/constants'
import { useRouter } from 'hooks'
import { COLOR_PRIMARY, COLOR_TEXT } from 'helpers/themeHelper'

const useStyles = makeStyles(() => ({
  tabSelected: { color: `${COLOR_TEXT} !important` },
  textColorInherit: {
    color: COLOR_PRIMARY,
    opacity: 1,
  },
  hiddenTab: {
    display: 'none',
  },
}))

export const NavTabs = () => {
  const classes = useStyles()
  const router = useRouter()
  let tabValue = NAV_LINKS.findIndex(({ href }) => router.pathname === href)

  if (tabValue === -1) {
    tabValue = ['/my-pools'].includes(router.pathname) ? 2 : 3
  }

  return (
    <Tabs value={tabValue}>
      {NAV_LINKS.map(({ href, text }) => (
        <Tab
          component={BaseLink}
          classes={{ textColorInherit: classes.textColorInherit, selected: classes.tabSelected }}
          to={href}
          label={text}
          key={href}
        />
      ))}
      <Tab className={classes.hiddenTab} />
    </Tabs>
  )
}
