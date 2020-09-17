import React from 'react';

import './Footer.css';

const Footer = (props) => {
	return (
        <div className='container'>
            <div className='footer__title'>
                Developed by:&nbsp; 
            </div>
            <div className='footer__content'>
                Sarvesh Singh
            </div>
            { props.children }
        </div>
    );
};

export default Footer;