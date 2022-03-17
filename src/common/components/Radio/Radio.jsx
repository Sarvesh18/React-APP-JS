import React from 'react';

import './Radio.css';

const Radio = (props) => {

    const { name, value, onClick } = props;

    return (
        <>
            <label className='font-size--large'>
                <input type='radio' name={name} value={value} onClick={onClick} /><span>{value}</span>
            </label>
        </>
    )
}

 export default Radio;