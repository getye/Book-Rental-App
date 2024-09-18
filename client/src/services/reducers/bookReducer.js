import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    SET_SEARCH_QUERY,
  } from '../actions/types';

  
  const initialState = {
    loading: false,
    books: [],
    error: null,
    searchValue: "",
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKS_REQUEST:
        return { ...state, loading: true };
      case FETCH_BOOKS_SUCCESS:
        return { loading: false, books: action.payload, error: null };
      case FETCH_BOOKS_FAILURE:
        return { loading: false, books: [], error: action.payload };
      case SET_SEARCH_QUERY: 
        return { ...state, searchValue: action.payload };
      default:
        return state;
    }
  };
  
  export default bookReducer;