import React from 'react';

import './Footer.css';

const Footer = (props) => {
	return (
        <div className='footer'>
            <span className='footer__title'>
                Developed by:&nbsp; 
            </span>
            <span className='footer__content'>
                Sarvesh Singh
            </span>
            { props.children }
        </div>
    );
};

export default Footer;