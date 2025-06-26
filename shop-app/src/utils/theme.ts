import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface PaletteBackground {
    appBody: string;
    componentBg: string;
    cookieBg: string;
  }
}

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: '#F7F8FB',
          componentBg: '#F7F8FB',
          surface: '#F7F8FB',
          cookieBg: '#e3e6e8', //#dfe7f0
        },
        primary: {
          100: "#F0EFFF",
          200: "#E2E0FF",
          300: "#C5C1FE",
          400: "#A7A1FE",
          500: "#8A82FD",
          600: "#6D63FD",
          700: "#574FCA",
          800: "#413B98",
          900: "#2C2865",
          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: 'var(--joy-palette-primary-600)',
        },
        text: {
          primary: '#111111',
          secondary: '#444444',
          tertiary: '#999999',
        }
      },
    },
    dark: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-common-black)',
          componentBg: 'var(--joy-palette-neutral-900)',
        },
      },
    },
  },
  fontFamily: {
    display: "Hubot Sans, var(--joy-fontFamily-fallback)", // applies to `h1`–`h4`
    body: "Hubot Sans, var(--joy-fontFamily-fallback)", // applies to `title-*` and `body-*`
  },
  typography: {
    h1: {
      color: 'var(--joy-palette-text-primary)',
      fontSize: "2.75rem",
      fontWeight: 900,
      lineHeight: "3.25rem",
      // fontStretch: "125%", //to use font stretch
    },
    h2: {
      color: 'var(--joy-palette-text-primary)',
      fontSize: "2.25rem",
      fontWeight: 900,
      lineHeight: "2.75rem",    
    },
    h3: {
      color: 'var(--joy-palette-text-primary)',
      fontSize: "2rem",
      fontWeight: 800,
      lineHeight: "2.5rem",
    },
    h4: {
      color: 'var(--joy-palette-text-primary)',
      fontSize: "1.75rem",
      fontWeight: 800,
      lineHeight: "2.25rem",
      // fontStretch: "75%", //to use font stretch
    },
    "body-lg": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: "1.5rem",
    },
    "body-md": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.25rem",
    },
    "body-sm": { 
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "0.75rem",
      fontWeight: 300,
      lineHeight: "1rem",
    },
    "body-xs": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "0.625rem",
      fontWeight: 300,
      lineHeight: "0.875rem",
    },
    "title-lg": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: "1.75rem",
    },
    "title-md": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
    },
    "title-sm": {
      color: 'var(--joy-palette-text-secondary)',
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.25rem",
    },
  },
  shadow: {
    md: '5px 20px 20px rgba(0, 0, 0, 0.1)',
  },
  components:{
   JoyFormHelperText:{
    styleOverrides:{
      root: ({ ownerState, theme }) =>({
        "&.form-error":{
          color: theme.palette.danger[500],
        }
      }),
    }
   } 
  }
});
