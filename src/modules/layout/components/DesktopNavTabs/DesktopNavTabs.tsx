import { Tabs, Tab, makeStyles } from '@material-ui/core'
import { BaseLink } from 'components/BaseLink'
import { NAV_LINKS } from 'modules/layout/constants'
import { useRouter } from 'hooks'
import { COLOR_SECONDARY } from 'helpers/themeHelper'

const useStyles = makeStyles(() => ({
  tabSelected: { color: COLOR_SECONDARY },
}))

export const NavTabs = () => {
  const classes = useStyles()
  const router = useRouter()
  const tabValue = NAV_LINKS.findIndex(({ href }) => router.pathname === href)

  return (
    <Tabs value={tabValue}>
      {NAV_LINKS.map(({ href, text }) => (
        <Tab component={BaseLink} classes={{ selected: classes.tabSelected }} to={href} label={text} key={href} />
      ))}
    </Tabs>
  )
}
