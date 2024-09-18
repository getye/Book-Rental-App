
import {
    SUBMIT_RENTAL_REQUEST,
    SUBMIT_RENTAL_SUCCESS,
    SUBMIT_RENTAL_FAILURE,
    FETCH_RENTS_REQUEST,
    FETCH_RENTS_SUCCESS,
    FETCH_RENTS_FAILURE,
    ACCEPT_RENT_REQUEST,
    ACCEPT_RENT_SUCCESS,
    ACCEPT_RENT_FAILURE,
    REJECT_RENT_REQUEST,
    REJECT_RENT_SUCCESS,
    REJECT_RENT_FAILURE,
    UPDATE_SEARCH_TERM,
  } from './types';
  
  export const submitRentalRequest = (rentalData) => ({
    type: SUBMIT_RENTAL_REQUEST,
    payload: rentalData,
  });
  
  export const submitRentalSuccess = (response) => ({
    type: SUBMIT_RENTAL_SUCCESS,
    payload: response,
  });
  
  export const submitRentalFailure = (error) => ({
    type: SUBMIT_RENTAL_FAILURE,
    payload: error,
  });

  export const fetchRentsRequest = () => ({
    type: FETCH_RENTS_REQUEST,
});

export const fetchRentsSuccess = (rents) => ({
    type: FETCH_RENTS_SUCCESS,
    payload: rents,
});

export const fetchRentsFailure = (error) => ({
    type: FETCH_RENTS_FAILURE,
    payload: error,
});

export const acceptRentRequest = (renter_id, book_id) => ({
    type: ACCEPT_RENT_REQUEST,
    payload: { renter_id, book_id },
});

export const acceptRentSuccess = (data) => ({
    type: ACCEPT_RENT_SUCCESS,
    payload: data,
});

export const acceptRentFailure = (error) => ({
    type: ACCEPT_RENT_FAILURE,
    payload: error,
});

export const rejectRentRequest = (renter_id, book_id) => ({
    type: REJECT_RENT_REQUEST,
    payload: { renter_id, book_id },
});

export const rejectRentSuccess = (data) => ({
    type: REJECT_RENT_SUCCESS,
    payload: data,
});

export const rejectRentFailure = (error) => ({
    type: REJECT_RENT_FAILURE,
    payload: error,  // You need this action creator
});

export const updateSearchTerm = (term) => ({
  type: UPDATE_SEARCH_TERM,
  payload: term,
});