import React, { LegacyRef } from 'react'
import { Tabs, Tab, makeStyles } from '@material-ui/core'
import { BaseLink } from 'components/BaseLink'
import { NAV_LINKS, ROUTES } from 'modules/layout/constants'
import { useRouter } from 'hooks'
import { COLOR_TEXT } from 'helpers/themeHelper'

const useStyles = makeStyles(() => ({
  tabSelected: { color: COLOR_TEXT },
  textColorInherit: {
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
    tabValue = 2
  }

  return (
    <Tabs value={tabValue}>
      {NAV_LINKS.map(({ href, text }) => (
        <Tab
          component={BaseLink}
          classes={{ selected: classes.tabSelected, textColorInherit: classes.textColorInherit }}
          to={href}
          label={text}
          key={href}
        />
      ))}
      <Tab className={classes.hiddenTab} />
    </Tabs>
  )
}
