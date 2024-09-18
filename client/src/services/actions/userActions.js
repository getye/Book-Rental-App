import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SET_SEARCH_TERM,
    UPDATE_USER_STATUS,
  } from './types';
  

  // Action to update user status
  export const updateUserStatus = (userId, newStatus) => ({
    type: UPDATE_USER_STATUS,
    payload: { userId, newStatus },
    });
  export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
  });

  export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
  });
  
  export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
  });
