// Copyright (c) Facebook, Inc. and its affiliates.
import { createMuiTheme } from '@material-ui/core/styles';

const textvqaTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#9ccc65',
        main: '#7cb342',
        dark: '#33691e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    typography: {
      useNextVariants: true,
    },
});

const textcapsTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#e34257',
        main: '#b13444',
        dark: '#9c2d3c',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    typography: {
      useNextVariants: true,
    },
});

const theme = window.location.href.indexOf("textcaps") === -1 ? textvqaTheme : textcapsTheme;

export default theme;
