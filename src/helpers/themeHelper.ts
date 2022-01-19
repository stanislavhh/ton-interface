import { createTheme } from '@material-ui/core'

export const COLOR_PRIMARY = '#0088CC'
export const COLOR_SECONDARY = '#303757'

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    secondary: {
      main: COLOR_SECONDARY,
    },
  },
  typography: {
    fontFamily: 'Mulish',
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '16px',
      },
      containedSizeLarge: {
        fontSize: '24px',
        lineHeight: '36px',
        '@media(min-width:600px)': {
          fontSize: '16px',
          lineHeight: '20px',
        },
      },
      outlinedSizeLarge: {
        padding: '8px 22px',
        fontSize: '24px',
        lineHeight: '36px',
        '@media(min-width:600px)': {
          fontSize: '16px',
          lineHeight: '20px',
        },
      },
    },
    MuiLink: {
      root: {
        cursor: 'pointer',
      },
      underlineHover: {
        transition: 'all ease-out 0.25s',
        '&:hover': {
          textDecoration: 'none',
          color: COLOR_SECONDARY,
        },
      },
    },
  },
})

// Typography
theme.typography.h1 = {
  fontFamily: 'Mulish',
  fontSize: '32px',
  lineHeight: '40px',
  fontWeight: 900,
  [theme.breakpoints.up('sm')]: {
    fontSize: '38px',
    lineHeight: '48px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '41px',
    lineHeight: '50px',
  },
}

theme.typography.h3 = {
  fontFamily: 'Mulish',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: 900,
  [theme.breakpoints.up('sm')]: {
    fontSize: '28px',
    lineHeight: '36px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '32px',
    lineHeight: '40px',
  },
}

theme.typography.h5 = {
  fontFamily: 'Mulish',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 800,
}

theme.typography.body1 = {
  fontFamily: 'Mulish',
  fontSize: '16px',
  lineHeight: '20px',
}

theme.typography.button = {
  fontFamily: 'Mulish',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 800,
}

theme.typography.caption = {
  fontFamily: 'Mulish',
  fontSize: '13px',
  lineHeight: '16px',
}
