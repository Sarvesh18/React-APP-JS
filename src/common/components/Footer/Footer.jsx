import React from 'react';

import './Footer.css';

const Footer = (props) => {
	return (
        <footer className='container'>
            <div className='footer__title'>
                Developed by:&nbsp; 
            </div>
            <div className='footer__content'>
                Sarvesh Singh
            </div>
            { props.children }
        </footer>
    );
};

export default Footer;