import React from 'react';

import './Footer.css';

const Footer = (props) => {
	return (
        <div className='container'>
            <h3 className='footer__title'>
                Developed by:&nbsp;Sarvesh Singh 
            </h3>
            { props.children }
        </div>
    );
};

export default Footer;