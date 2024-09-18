import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    fetchUsersSuccess, 
    fetchUsersFailure,
    updateUserStatus as updateUserStatusAction,
    } from '../actions/userActions';
//import { UPDATE_USER_STATUS } from '../actions/types';

function* fetchUsers() {
  try {
    const response = yield call(fetch, 'http://localhost:8001/admin/users');
    const data = yield response.json();

    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }

    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// API call to update user status
function* updateUserStatus(action) {
    try {
      const { userId, newStatus } = action.payload;
      // Make API call to update user status
      const response = yield call(fetch, `http://localhost:8001/admin/users/${userId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user status');
      }
  
    // If successful, dispatch action to update the local state
      yield put(updateUserStatusAction(userId, newStatus));
    } catch (error) {
      console.error(error);
      // Handle error if necessary
      // You might want to dispatch an error action here as well
    }
  }

function* userSaga() {
  yield takeEvery('FETCH_USERS_REQUEST', fetchUsers);
  yield takeEvery('UPDATE_USER_STATUS', updateUserStatus);
}

export default userSaga;