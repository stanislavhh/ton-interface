import { makeStyles, Drawer, Grid, Container, Icon } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useAppDispatch, useRouter } from 'hooks'

import { toggleDrawer, NAV_LINKS } from 'modules/layout'
import ConnectWalletButton from 'modules/wallet'
import { $mobileDrawerActive } from 'modules/layout/selectors'

import { DrawerLink } from './DrawerLink'
import HeaderLogo from 'assets/ton logo (light background).svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100vw',
  },
  headerContainer: {
    paddingTop: theme.spacing(6),
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(6),
  },
  walletContainer: {
    marginBottom: theme.spacing(2),
  },
  logoImage: {
    height: '36px',
  },
}))

export const MobileNavDrawer = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const mobileDrawerActive = useSelector($mobileDrawerActive)

  const closeDrawer = () => dispatch(toggleDrawer(false))

  return (
    <Drawer classes={{ paper: classes.paper }} anchor="right" open={mobileDrawerActive} onClose={closeDrawer}>
      <Container maxWidth="lg">
        <Grid container className={classes.headerContainer}>
          <Grid item xs={6}>
            <img src={HeaderLogo} className={classes.logoImage} alt="logo" />
          </Grid>
          <Grid item xs={6} className={classes.closeContainer}>
            <Icon onClick={closeDrawer}>close</Icon>
          </Grid>
          <Grid item xs={12} className={classes.walletContainer}>
            <ConnectWalletButton fullWidth />
          </Grid>
          <>
            {NAV_LINKS.map(({ text, href }) => (
              <Grid item xs={12} key={href}>
                <DrawerLink text={text} to={href} onClick={closeDrawer} isActive={router.pathname === href} />
              </Grid>
            ))}
          </>
        </Grid>
      </Container>
    </Drawer>
  )
}
