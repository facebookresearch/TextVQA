// Copyright (c) Facebook, Inc. and its affiliates.
import { createMuiTheme } from '@material-ui/core/styles';
import { getWebsiteType } from './utils';

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

const textocrTheme = createMuiTheme({
    // palette: {
    //   primary: {
    //     light: '#e34257',
    //     main: '#b13444',
    //     dark: '#9c2d3c',
    //     contrastText: '#fff',
    //   },
    //   secondary: {
    //     light: '#ff7961',
    //     main: '#f44336',
    //     dark: '#ba000d',
    //     contrastText: '#000',
    //   },
    // },
    typography: {
      useNextVariants: true,
    },
});

const typeToThemeMapping = {
  textvqa: textvqaTheme,
  textocr: textocrTheme,
  textcaps: textcapsTheme,
};

const theme = typeToThemeMapping[getWebsiteType()];

export default theme;
