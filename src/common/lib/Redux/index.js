import { combineReducers } from 'redux';

import home from '@views/Home/Home.reducer';
import detail from '@views/Detail/Detail.reducer';

const reducers = combineReducers({
    home,
    detail
});

export default reducers;