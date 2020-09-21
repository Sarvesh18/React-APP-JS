import { HOME_API_LOADING, HOME_API_SUCCESS, HOME_API_FAILURE, HOME_API_RESET } from './Home.constant';

import { getAllLaunches } from './Home.service';

export const getLaunchesData = (skip, limit, year, launch, landing) => (dispatch, getState) => {

    let query = `?limit=${limit}`;

    if(year) {
        query +=`&launch_year=${year}`;
    }
    if(launch) {
        query +=`&launch_success=${launch}`;    
    }
    if(landing) {
        query +=`&land_success=${landing}`;        
    }

    dispatch({
        type: HOME_API_LOADING
    });
    
    return getAllLaunches(query)
        .then(data => {
            dispatch({
                type: HOME_API_SUCCESS,
                skip,
                data: data
            })
        })
        .catch(error => {
            dispatch({
                type: HOME_API_FAILURE,
                error: error.message
            })
        });
};