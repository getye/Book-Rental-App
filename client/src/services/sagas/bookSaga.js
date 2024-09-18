import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchBooksSuccess,
  fetchBooksFailure,
} from '../actions/bookActions';
import {
    RENTER_FETCH_BOOKS_REQUEST,
    OWNER_FETCH_BOOKS_REQUEST,
    ADMIN_FETCH_BOOKS_REQUEST
  } from '../actions/types';

function* renterFetchBooks() {
  try {
    const response = yield call(fetch, 'http://localhost:8001/renter/books');
    const data = yield response.json();
    if (response.ok) {
      yield put(fetchBooksSuccess(data));
    } else {
      yield put(fetchBooksFailure(data.message));
    }
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

function* ownerFetchBooks() {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
    const response = yield call(fetch, 'http://localhost:8001/owner/view/books', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in header
      }
    });
    
    const data = yield response.json();
    if (response.ok) {
      yield put(fetchBooksSuccess(data));
    } else {
      yield put(fetchBooksFailure(data.message));
    }
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

function* adminFetchBooks() {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
    const response = yield call(fetch, 'http://localhost:8001/admin/books', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in header
      }
    });
    
    const data = yield response.json();
    if (response.ok) {
      yield put(fetchBooksSuccess(data));
    } else {
      yield put(fetchBooksFailure(data.message));
    }
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

function* bookSaga() {
  yield takeEvery(RENTER_FETCH_BOOKS_REQUEST, renterFetchBooks);
  yield takeEvery(OWNER_FETCH_BOOKS_REQUEST, ownerFetchBooks);
  yield takeEvery(ADMIN_FETCH_BOOKS_REQUEST, adminFetchBooks);
}

export default bookSaga;