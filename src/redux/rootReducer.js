import { combineReducers } from '@reduxjs/toolkit';
import user from './userSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		user,
		...asyncReducers
	});


	return combinedReducer(state, action);
};

export default createReducer;
