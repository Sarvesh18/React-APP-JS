// TODO: Localisation
import React from 'react';

const LocaleContext = React.createContext('en');

/**
 * 
 * @param {*} props 
 */
const LocaleProvider = (props) => {

    return(
        <LocaleContext.Provider value={en}>
            {props.children}
        </LocaleContext.Provider>
    );
};

export default LocaleProvider;