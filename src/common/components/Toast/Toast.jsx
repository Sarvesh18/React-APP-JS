import React from 'react';

//position
//type
const Toast = (props) => {
    
    switch(props.type) {
        case 'INFO':
            return (
                <>
                    <h3>{props.header}</h3>
                    <h6>{props.message}</h6>
                </>   
            );
        case 'SUCCESS':
            return (
                <>
                    <h3>{props.header}</h3>
                    <h6>{props.message}</h6>
                </>   
            );
        case 'FAILURE':
            return (
                <>
                    <h3>{props.header}</h3>
                    <h6>{props.message}</h6>
                </>   
            );
        case 'WARNING':
            return (
                <>
                    <h3>{props.header}</h3>
                    <h6>{props.message}</h6>
                </>   
            );
        default:
            return null;
    };
};

export default Error;