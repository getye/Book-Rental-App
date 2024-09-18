import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import bookSaga from './bookSaga';
import rentalSaga from './rentalSaga'
import {watchFetchCounts, watchFetchBookCounts} from './statisticsSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    bookSaga(),
    rentalSaga(),
    watchFetchCounts(),
    watchFetchBookCounts(),
  ]);
}