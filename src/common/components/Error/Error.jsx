import React from 'react';

const Error = (props) => {
    
    switch(props.code) {
        case 404:
            return (
                <h1>
                    404 Not Found.
                </h1>   
            );
        default:
            return (
                <h1>
                    Something went wrong.
                </h1>   
            );
    };
};

export default Error;