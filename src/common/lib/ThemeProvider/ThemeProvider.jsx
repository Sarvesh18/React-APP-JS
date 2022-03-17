const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
};


import React from 'react';

const ThemeContext = React.createContext({
  theme: themes.dark
});

/**
 * @see
 * @param {*} props 
 */
const ThemeProvider = (props) => {

  return (
    <ThemeContext.Provider >
      {props.children}
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;





