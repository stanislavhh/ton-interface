import { Grid, Icon, makeStyles } from '@material-ui/core'
import { useAppDispatch, useTabletPoint } from 'hooks'
import NavTabs from 'modules/layout/components/DesktopNavTabs'
import ConnectWalletButton from 'modules/wallet'
import HeaderLogo from 'assets/ton logo (light background).svg'
import { toggleDrawer } from 'modules/layout'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    paddingTop: theme.spacing(6),
  },
  logoImage: {
    height: '36px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  walletContainer: {
    display: 'flex',
    alignItem: 'center',
  },
}))

export const Header = (): JSX.Element => {
  const classes = useStyles()
  const isTablet = useTabletPoint()
  const dispatch = useAppDispatch()

  return (
    <Grid container spacing={4} className={classes.headerContainer}>
      <Grid item xs={2}>
        <img src={HeaderLogo} className={classes.logoImage} alt="logo" />
      </Grid>
      <Grid item xs={10} md={7} className={classes.navContainer}>
        {!isTablet ? <NavTabs /> : <Icon onClick={() => dispatch(toggleDrawer(true))}>menu</Icon>}
      </Grid>
      {!isTablet && (
        <Grid item xs={3} className={classes.walletContainer}>
          <ConnectWalletButton fullWidth />
        </Grid>
      )}
    </Grid>
  )
}
