import { DETAIL_API_LOADING, DETAIL_API_SUCCESS, DETAIL_API_FAILURE, DETAIL_API_RESET } from './Detail.constant';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailure: false,    
    data: {},
    error: ''
};

const detail = (state = initialState, action) => {
    
    switch(action.type) {
        case DETAIL_API_LOADING: 
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailure: false,
                error: ''
            }
        case DETAIL_API_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.data
            }
        case DETAIL_API_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isFailure: true,
                error: action.error || 'Something went wrong!!!'
            }
        case DETAIL_API_RESET: 
            return {
                isLoading: false,
                isSuccess: false,
                isFailure: false,
                data: [],
                error: ''
            }
        default:
            return state;
    }
}

export default detail;