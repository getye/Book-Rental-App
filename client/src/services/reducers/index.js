import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import rentalReducer from './rentalReducer';
import {statisticsReducer} from './statisticsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  rental: rentalReducer,
  statistics: statisticsReducer
});

export default rootReducer;