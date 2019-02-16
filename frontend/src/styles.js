import { createMuiTheme } from '@material-ui/core/styles';
import { lightGreen, blue, white, green } from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
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
  });
export default theme;