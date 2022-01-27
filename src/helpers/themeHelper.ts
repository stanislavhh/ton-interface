import { createTheme } from '@material-ui/core'

export const COLOR_PRIMARY = '#0088CC'
export const COLOR_TEXT = '#303757'
export const COLOR_WHITE = '#FFF'
export const COLOR_TEXT_GRAY = '#808080'

export const BORDER_RADIUS1 = '24px'
export const BORDER_RADIUS2 = '16px'
export const BORDER_RADIUS3 = '12px'
export const BORDER_RADIUS4 = '8px'
export const BORDER_RADIUS5 = '6px'
export const BORDER_RADIUS6 = '4px'

export const iconsTransition = {
  cursor: 'pointer',
  transition: 'transform ease-out 0.05s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}

export const xsButton = {
  borderRadius: BORDER_RADIUS6,
  minWidth: '40px',
  boxShadow: 'none',
  background: COLOR_WHITE,
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1360,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    text: {
      primary: COLOR_TEXT,
      secondary: COLOR_TEXT_GRAY,
    },
    secondary: {
      main: COLOR_TEXT,
    },
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: BORDER_RADIUS1,
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.09)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        '&.Mui-focused': {
          backgroundColor: 'rgba(0,0,0,0.07)',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: BORDER_RADIUS2,
      },

      containedPrimary: {
        boxShadow: 'none',
        '&:hover, &:active': {
          boxShadow: 'none',
        },
      },
      containedSizeLarge: {
        minHeight: '48px',
        fontSize: '24px',
        lineHeight: '36px',
        '@media(min-width:600px)': {
          fontSize: '16px',
          lineHeight: '20px',
        },
      },
      outlined: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: BORDER_RADIUS4,
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
          color: COLOR_TEXT,
        },
      },
    },
  },
})

const commonTypo = {
  color: COLOR_TEXT,
  fontFamily: 'Mulish',
}

// Typography
theme.typography.h1 = {
  ...commonTypo,
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
theme.typography.h2 = {
  ...commonTypo,
}

theme.typography.h3 = {
  ...commonTypo,
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

theme.typography.h4 = {
  ...commonTypo,
  fontSize: '20px',
  lineHeight: '24px',
}

theme.typography.h5 = {
  ...commonTypo,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 800,
}

theme.typography.h6 = {
  ...commonTypo,
}

theme.typography.body1 = {
  ...commonTypo,
  fontSize: '20px',
  lineHeight: '24px',
}

theme.typography.body2 = {
  ...commonTypo,
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 400,
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
    lineHeight: '20px',
  },
}

theme.typography.subtitle1 = {
  ...commonTypo,
  fontSize: '16px',
  lineHeight: '20px',
}

theme.typography.subtitle2 = {
  ...commonTypo,
}

theme.typography.button = {
  ...commonTypo,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 800,
}

theme.typography.caption = {
  ...commonTypo,
  fontSize: '13px',
  lineHeight: '16px',
}

theme.typography.overline = {
  ...commonTypo,
}

// overrides with psssed theme
if (theme.overrides) {
  theme.overrides.MuiTooltip = {
    popper: {
      backdropFilter: 'blur(1px)',
    },

    tooltip: {
      maxWidth: '200px',
      borderRadius: BORDER_RADIUS3,
      backgroundColor: 'rgba(135, 135, 135, 0.9)',
      paddingInline: theme.spacing(2),
      paddingBlock: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        ...theme.typography.caption,
        color: COLOR_WHITE,
        lineHeight: '20px',
      },
      '& .MuiTooltip-arrow': {
        color: 'rgba(135, 135, 135, 0.9)',
      },
    },
  }
}
