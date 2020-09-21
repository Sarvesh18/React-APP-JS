import { HOME_API_LOADING, HOME_API_SUCCESS, HOME_API_FAILURE, HOME_API_RESET } from './Home.constant';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailure: false,    
    data: [],
    error: ''
};

const home = (state = initialState, action) => {
    
    switch(action.type) {

        case HOME_API_LOADING: 
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailure: false,
                error: ''
            }
        case HOME_API_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.skip ? [...state.data, ...action.data] : action.data
            }
        case HOME_API_FAILURE: 
            return {
                ...state,
                isLoading: false,
                isFailure: true,
                error: action.error || 'Something went wrong!!!'
            }
        case HOME_API_RESET: 
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

export default home;