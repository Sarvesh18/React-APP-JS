import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const Router = (props) => {
    
    return (
        <BrowserRouter>
            { props.children }
        </BrowserRouter>
    );
};

export default Router;