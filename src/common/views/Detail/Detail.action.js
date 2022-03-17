import { DETAIL_API_LOADING, DETAIL_API_SUCCESS, DETAIL_API_FAILURE, DETAIL_API_RESET } from './Detail.constant';

import { getLaunchById } from './Detail.service';

export const getLaunchDetail = (id) => (dispatch, getState) => {

    dispatch({
        type: DETAIL_API_LOADING
    });
    
    return getLaunchById(id)
        .then(data => dispatch({
            type: DETAIL_API_SUCCESS,
            data: data
        }))
        .catch(error => dispatch({
            type: DETAIL_API_FAILURE,
            error: error.message
        }));
};