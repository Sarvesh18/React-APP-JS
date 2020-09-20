import React from 'react';
//import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
	return (
        <header className='header'>
            {props.children}
            <h2 className='header__title'>SpaceX Launch Programs</h2>
        </header>
    );
};

Header.propTypes = {
//PropTypes.string.isRequired
//.object
//.array
//onOfType
};

Header.defaultProps = {

};

export default Header;


