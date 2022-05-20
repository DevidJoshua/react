import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    overrides: {
      MuiInputBase: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
            background:'red'
          },
        },
      },
    },
  });

export default theme



