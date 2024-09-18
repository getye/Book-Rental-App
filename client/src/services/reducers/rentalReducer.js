
import {
    SUBMIT_RENTAL_REQUEST,
    SUBMIT_RENTAL_SUCCESS,
    SUBMIT_RENTAL_FAILURE,
    FETCH_RENTS_REQUEST,
    FETCH_RENTS_SUCCESS,
    FETCH_RENTS_FAILURE,
    ACCEPT_RENT_SUCCESS,
    REJECT_RENT_SUCCESS,
    UPDATE_SEARCH_TERM,
  } from '../actions/types';
  
  const initialState = {
    loading: false, 
    rents: [],
    filteredRents: [], 
    rentalResponse: null,
    error: null,
  };
  
  const rentalReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_RENTAL_REQUEST:
        return { ...state, loading: true };
      case SUBMIT_RENTAL_SUCCESS:
        return { loading: false, rentalResponse: action.payload, error: null };
      case SUBMIT_RENTAL_FAILURE:
        return { loading: false, rentalResponse: null, error: action.payload };
      case FETCH_RENTS_REQUEST:
          return { ...state, loading: true };
      case FETCH_RENTS_SUCCESS:
          return {
              ...state,
              rents: action.payload,
              filteredRents: action.payload, // Initially, filtered rents are the same as all rents
              loading: false,
          };
      case UPDATE_SEARCH_TERM:
          const filteredRents = state.rents.filter(rent => {
              const searchTerm = action.payload.toLowerCase();
              return (
                  rent.book_title.toLowerCase().includes(searchTerm) ||
                  rent.request_status.toLowerCase().includes(searchTerm) ||
                  rent.user_name.toLowerCase().includes(searchTerm)
              );
          });

          return {
              ...state,
              searchTerm: action.payload,
              filteredRents: filteredRents, // Update filtered rents based on search term
          };
      case FETCH_RENTS_FAILURE:
          return { ...state, loading: false, error: action.payload };
      case ACCEPT_RENT_SUCCESS:
      case REJECT_RENT_SUCCESS:
          return {
              ...state,
              rents: state.rents.map(rent =>
                  rent.book_id === action.payload.book_id
                      ? { ...rent, request_status: action.payload.request_status }
                      : rent
              ),
          };
      default:
        return state;
    }
  };
  
  export default rentalReducer;
  