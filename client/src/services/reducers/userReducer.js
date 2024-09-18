import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SET_SEARCH_TERM,
    UPDATE_USER_STATUS,
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
    searchTerm: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case SET_SEARCH_TERM:
        return { ...state, searchTerm: action.payload };
      case UPDATE_USER_STATUS:
        return {
            ...state,
            users: state.users.map(user =>
            user.user_id === action.payload.userId
                ? { ...user, user_status: action.payload.newStatus }
                : user
            ),
        };
      default:
        return state;
    }
  };
  
  export default userReducer;