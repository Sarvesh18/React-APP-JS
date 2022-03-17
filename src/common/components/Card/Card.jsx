import React from 'react';

import './Card.css';

const Card = (props) => {

    const { flight_number, links: { mission_patch, mission_patch_small }, mission_name, mission_id, launch_year, launch_success, launch_landing } = props.launch;
    
    //console.log('launch ===>', props.launch);

    return(
        <div className='card'>
            
            <div>
                <img className='card__image' src={mission_patch_small} alt='LaunchPhoto' />
            </div>
            
            <h3 className='card__heading'>{`${mission_name} #${flight_number}`}</h3>
            
            <div className='card__content'>
                <p>Launch Year: {launch_year}</p>
                <p>Mission Ids:</p> 
                <div>
                    <ul>
                    {
                        mission_id.map((id, key) => {
                            <li>{id}</li>
                        })
                    }
                    </ul>
                </div>
                <p>Successful Launch: {launch_success ? 'true' : 'false'}</p>
                <p>Successful Landing: {launch_landing ? 'true' : 'false'}</p>
            </div>
            <p>
                <button type="button" onClick={()=> {
                    props.history.push(`/detail/${flight_number}`)
                }}>More Details
                </button>
            </p> 
        </div>
    );
}

export default Card;