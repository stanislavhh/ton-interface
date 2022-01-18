import { Grid, Icon, makeStyles } from '@material-ui/core'
import { HeaderLink } from './HeaderLink'
import { useAppDispatch, useMobilePoint, useRouter } from 'hooks'
import HeaderLogo from 'assets/ton logo (light background).svg'
import { toggleDrawer } from 'modules/layout'
import { NAV_LINKS } from 'modules/layout'

const useStyles = makeStyles(() => ({
  headerContainer: {
    paddingTop: '48px',
  },
  logoImage: {
    height: '36px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
}))

export const Header = (): JSX.Element => {
  const classes = useStyles()
  const isMobile = useMobilePoint()
  const router = useRouter()
  const dispatch = useAppDispatch()

  return (
    <Grid container className={classes.headerContainer}>
      <Grid item xs={6}>
        <img src={HeaderLogo} className={classes.logoImage} alt="logo" />
      </Grid>
      <Grid item xs={6} className={classes.navContainer}>
        {!isMobile ? (
          <>
            {NAV_LINKS.map(({ href, text }) => (
              <HeaderLink to={href} text={text} key={href} isActive={router.pathname === href} />
            ))}
          </>
        ) : (
          <Icon onClick={() => dispatch(toggleDrawer(true))}>menu</Icon>
        )}
      </Grid>
    </Grid>
  )
}
