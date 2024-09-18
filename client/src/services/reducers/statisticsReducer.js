// reducers/statisticsReducer.js

import { 
  FETCH_COUNTS_REQUEST, FETCH_COUNTS_SUCCESS, FETCH_COUNTS_FAILURE,
  FETCH_BOOK_COUNTS_REQUEST, FETCH_BOOK_COUNTS_SUCCESS, FETCH_BOOK_COUNTS_FAILURE,
  FETCH_EARNINGS_REQUEST, FETCH_EARNINGS_SUCCESS, FETCH_EARNINGS_FAILURE,
  FETCH_RENT_STATUS_REQUEST, FETCH_RENT_STATUS_SUCCESS, FETCH_RENT_STATUS_FAILURE,
  FETCH_RENT_FEE_REQUEST, FETCH_RENT_FEE_SUCCESS, FETCH_RENT_FEE_FAILURE,

} from '../actions/statisticsActions';

const initialState = {
  counts: {
    ownersCount: 0,
    rentersCount: 0,
    adminsCount: 0,
    booksCount: 0,
  },
  bookCategoryCounts: [], // New state for category counts
  earnings: [],
  fees: [],
  loading: false,
  error: null,
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTS_REQUEST:
    case FETCH_BOOK_COUNTS_REQUEST:
    case FETCH_EARNINGS_REQUEST:
    case FETCH_RENT_STATUS_REQUEST:
    case FETCH_RENT_FEE_REQUEST:
      return { ...state, loading: true };

    case FETCH_COUNTS_SUCCESS:
      return { ...state, loading: false, counts: action.payload };

    case FETCH_BOOK_COUNTS_SUCCESS:
    case FETCH_RENT_STATUS_SUCCESS:
      return { ...state, loading: false, bookCategoryCounts: action.payload };
    case FETCH_EARNINGS_SUCCESS:
      return { ...state, loading: false, earnings: action.payload };
    case FETCH_RENT_FEE_SUCCESS:
      return { ...state, loading: false, fees: action.payload };
    case FETCH_COUNTS_FAILURE:
    case FETCH_BOOK_COUNTS_FAILURE:
    case FETCH_EARNINGS_FAILURE:
    case FETCH_RENT_STATUS_FAILURE:
    case FETCH_RENT_FEE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
