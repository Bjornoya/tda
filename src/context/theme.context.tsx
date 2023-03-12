import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
});

function ThemeProvider({ children }: IProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
