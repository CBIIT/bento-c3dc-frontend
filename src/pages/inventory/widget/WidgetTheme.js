import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({
  children,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  const MuiSwitch = {
    switchBase: {
      color: '#08A0B4',      
      padding: '0px',  
      top: '9.5%',
      left: '3.3px',
    },

    colorSecondary: {
      '&$checked': {
        color: '#838383',
      },
      '&track': {
        backgroundColor: '#fff',
      },
      '&$checked + $track': {
        backgroundColor: '#fff',
      },
    },
    root: {
      borderRadius: '60px',
      border: '1px solid #919191',
      padding: '0px',
      width: '47px',
      height: '24px',
    }, 
    thumb: {
      width: '18px',
      height: '18px',
      boxShadow: 'none',
    },
    track: {
      backgroundColor: '#fff',
    },
  }

  overridesObj.MuiSwitch = MuiSwitch;

  style.push(overridesObj);
  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
