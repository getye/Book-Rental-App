
import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    SET_SEARCH_QUERY,
    RENTER_FETCH_BOOKS_REQUEST,
    OWNER_FETCH_BOOKS_REQUEST,
    ADMIN_FETCH_BOOKS_REQUEST
  } from './types';

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const renterFetchBooksRequest = () => ({
  type: RENTER_FETCH_BOOKS_REQUEST,
});

export const ownerFetchBooksRequest = () => ({
  type: OWNER_FETCH_BOOKS_REQUEST,
});

export const adminFetchBooksRequest = () => ({
  type: ADMIN_FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});

export const setSearchTerm = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});


