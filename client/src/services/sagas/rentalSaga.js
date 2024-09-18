
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  submitRentalSuccess,
  submitRentalFailure,
  fetchRentsSuccess,
  fetchRentsFailure,
  acceptRentSuccess,
  acceptRentFailure,
  rejectRentSuccess,
  rejectRentFailure,
} from '../actions/rentalActions';
import { 
  SUBMIT_RENTAL_REQUEST,
  FETCH_RENTS_REQUEST,
  ACCEPT_RENT_REQUEST,
  REJECT_RENT_REQUEST,
} from '../actions/types'
import axios from 'axios';

function* submitRentalSaga(action) {
    
    try {
      // Get the token from local storage or wherever you store it
      const token = localStorage.getItem('token');
  
      const response = yield call(axios.post, 'http://localhost:8001/renter/book/rent', action.payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'application/json', // Ensure the content type is correct
        },
      });
  
      yield put(submitRentalSuccess(response.data));
    } catch (error) {
      // Handle errors
      yield put(submitRentalFailure(error.message));
    }
  }

  function* fetchRentsSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:8001/admin/approve/rents');
        yield put(fetchRentsSuccess(response.data));
    } catch (error) {
        yield put(fetchRentsFailure(error.message));
    }
}

function* acceptRentSaga(action) {
    const { renter_id, book_id } = action.payload;
    try {
        const response = yield call(axios.put, `http://localhost:8001/admin/approve/rent/accept`, { renter_id, book_id });
        yield put(acceptRentSuccess(response.data));
    } catch (error) {
        yield put(acceptRentFailure(error.message));
    }
}

function* rejectRentSaga(action) {
    const { renter_id, book_id } = action.payload;
    try {
        const response = yield call(axios.put, `http://localhost:8001/admin/approve/rent/reject`, { renter_id, book_id });
        yield put(rejectRentSuccess(response.data));
    } catch (error) {
        yield put(rejectRentFailure(error.message));
    }
}


function* rentalSaga() {
  yield takeLatest(SUBMIT_RENTAL_REQUEST, submitRentalSaga);
  yield takeLatest(FETCH_RENTS_REQUEST, fetchRentsSaga);
  yield takeLatest(ACCEPT_RENT_REQUEST, acceptRentSaga);
  yield takeLatest(REJECT_RENT_REQUEST, rejectRentSaga);
}

export default rentalSaga;
