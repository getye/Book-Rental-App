
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
  fetchCountsSuccess, 
  fetchCountsFailure, 
  FETCH_COUNTS_REQUEST,
  fetchEarningsSuccess, 
  fetchEarningsFailure, 
  FETCH_EARNINGS_REQUEST,
  fetchRentStatusSuccess,
  fetchRentStatusFailure,
  FETCH_RENT_STATUS_REQUEST,
  fetchRentFeeSuccess,
  fetchRentFeeFailure,
  FETCH_RENT_FEE_REQUEST
} from '../actions/statisticsActions';

import { 
  fetchBookCountsSuccess, 
  fetchBookCountsFailure, 
  FETCH_BOOK_COUNTS_REQUEST 
} from '../actions/statisticsActions';

function* fetchCounts() {
  try {
    const response = yield call(axios.get, 'http://localhost:8001/admin/dashboard');
    yield put(fetchCountsSuccess(response.data));
  } catch (error) {
    yield put(fetchCountsFailure(error.message));
  }
}

function* fetchBookCounts() {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const response = yield call(fetch, 'http://localhost:8001/owner/dashboard/book-types', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the header
      }
    });

    // Parse the JSON response
    const data = yield response.json();

    // Log the data to inspect its structure
    console.log("API Response:", data);

    // Ensure the data is an array before mapping
    if (Array.isArray(data)) {
      const formattedData = data.map(item => ({
        category: item.catagory, // Corrected the key name
        count: parseInt(item.count, 10), // Ensure count is a number
        rent_quantity: parseInt(item.rent_quantity, 10) // Ensure rent_quantity is a number
      }));

      // Dispatch success action with formatted data
      yield put(fetchBookCountsSuccess(formattedData));
    } else {
      throw new Error("Expected an array but received something else.");
    }
  } catch (error) {
    console.error("Error in fetchBookCounts:", error.message);
    // Dispatch failure action in case of an error
    yield put(fetchBookCountsFailure(error.message));
  }
}

function* fetchEarningsSaga() {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = yield call(fetch, 'http://localhost:8001/owner/dashboard/monthly-earnings', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = yield response.json();
    if (response.ok) {
      const formattedData = data.map(item => ({
        period: new Date(item.period).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        fiction_earnings: parseFloat(item.fiction_earnings) || 0,
        business_earnings: parseFloat(item.business_earnings) || 0,
        self_help_earnings: parseFloat(item.self_help_earnings) || 0,
        total_earnings: parseFloat(item.total_earnings) || 0
      }));
      yield put(fetchEarningsSuccess(formattedData));
    } else {
      throw new Error('Failed to fetch earnings data');
    }
  } catch (error) {
    yield put(fetchEarningsFailure(error.message));
  }
}


function* fetchRents() {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const response = yield call(fetch, 'http://localhost:8001/renter/dashboard/book-types', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the header
      }
    });

    // Parse the JSON response
    const data = yield response.json();

    // Log the data to inspect its structure
    console.log("API Response:", data);

    // Ensure the data is an array before mapping
    if (Array.isArray(data)) {
      const formattedData = data.map(item => ({
        category: item.catagory, // Corrected the key name
        count: parseInt(item.count, 10), // Ensure count is a number
      }));

      // Dispatch success action with formatted data
      yield put(fetchRentStatusSuccess(formattedData));
    } else {
      throw new Error("Expected an array but received something else.");
    }
  } catch (error) {
    console.error("Error in fetchBookCounts:", error.message);
    // Dispatch failure action in case of an error
    yield put(fetchRentStatusFailure(error.message));
  }
}

function* fetchRentFee() {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = yield call(fetch, 'http://localhost:8001/renter/dashboard/monthly-fees', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = yield response.json();
    if (response.ok) {
      const formattedData = data.map(item => ({
        period: new Date(item.period).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        fiction_fee: parseFloat(item.fiction_fee) || 0,
        business_fee: parseFloat(item.business_fee) || 0,
        self_help_fee: parseFloat(item.self_help_fee) || 0,
        total_fee: parseFloat(item.total_fee) || 0
      }));
      console.log("Formatted Data: ", formattedData)
      yield put(fetchRentFeeSuccess(formattedData));
    } else {
      throw new Error('Failed to fetch fee data');
    }
  } catch (error) {
    yield put(fetchRentFeeFailure(error.message));
  }
}


export function* watchFetchCounts() {
  yield takeLatest(FETCH_COUNTS_REQUEST, fetchCounts);
  yield takeLatest(FETCH_EARNINGS_REQUEST, fetchEarningsSaga); 
  yield takeLatest(FETCH_RENT_STATUS_REQUEST, fetchRents);
  yield takeLatest(FETCH_RENT_FEE_REQUEST, fetchRentFee);   
}

export function* watchFetchBookCounts() {
  yield takeLatest(FETCH_BOOK_COUNTS_REQUEST, fetchBookCounts);
}
