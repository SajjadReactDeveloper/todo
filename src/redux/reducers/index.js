import { combineReducers } from 'redux';

import todo from './todo';

const rootReducer = combineReducers({
    // Add reducers here
    todo
});

export default rootReducer;