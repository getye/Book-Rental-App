
export const FETCH_COUNTS_REQUEST = 'FETCH_COUNTS_REQUEST';
export const FETCH_COUNTS_SUCCESS = 'FETCH_COUNTS_SUCCESS';
export const FETCH_COUNTS_FAILURE = 'FETCH_COUNTS_FAILURE';


export const FETCH_BOOK_COUNTS_REQUEST = 'FETCH_BOOK_COUNTS_REQUEST';
export const FETCH_BOOK_COUNTS_SUCCESS = 'FETCH_BOOK_COUNTS_SUCCESS';
export const FETCH_BOOK_COUNTS_FAILURE = 'FETCH_BOOK_COUNTS_FAILURE';


export const FETCH_EARNINGS_REQUEST = 'FETCH_EARNINGS_REQUEST';
export const FETCH_EARNINGS_SUCCESS = 'FETCH_EARNINGS_SUCCESS';
export const FETCH_EARNINGS_FAILURE = 'FETCH_EARNINGS_FAILURE';

export const FETCH_RENT_STATUS_REQUEST = 'FETCH_RENT_STATUS_REQUEST';
export const FETCH_RENT_STATUS_SUCCESS = 'FETCH_RENT_STATUS_SUCCESS';
export const FETCH_RENT_STATUS_FAILURE = 'FETCH_RENT_STATUS_FAILURE';

export const FETCH_RENT_FEE_REQUEST = 'FETCH_RENT_FEE_REQUEST';
export const FETCH_RENT_FEE_SUCCESS = 'FETCH_RENT_FEE_SUCCESS';
export const FETCH_RENT_FEE_FAILURE = 'FETCH_RENT_FEE_FAILURE';

export const fetchRentStatusRequest = () => ({ type: FETCH_RENT_STATUS_REQUEST });
export const fetchRentStatusSuccess = (data) => ({ 
  type: FETCH_RENT_STATUS_SUCCESS, 
  payload: data 
});
export const fetchRentStatusFailure = (error) => ({ 
  type: FETCH_RENT_STATUS_FAILURE, 
  payload: error 
});

export const fetchRentFeeRequest = () => ({ type: FETCH_RENT_FEE_REQUEST });
export const fetchRentFeeSuccess = (data) => ({ 
  type: FETCH_RENT_FEE_SUCCESS, 
  payload: data 
});
export const fetchRentFeeFailure = (error) => ({ 
  type: FETCH_RENT_FEE_FAILURE, 
  payload: error 
});

export const fetchEarningsRequest = () => ({ 
  type: FETCH_EARNINGS_REQUEST 
});
export const fetchEarningsSuccess = (data) => ({ 
  type: FETCH_EARNINGS_SUCCESS, 
  payload: data 
});
export const fetchEarningsFailure = (error) => ({ 
  type: FETCH_EARNINGS_FAILURE, 
  payload: error 
});



// Action creators for book category counts
export const fetchBookCountsRequest = () => ({
  type: FETCH_BOOK_COUNTS_REQUEST,
});

export const fetchBookCountsSuccess = (counts) => ({
  type: FETCH_BOOK_COUNTS_SUCCESS,
  payload: counts,
});

export const fetchBookCountsFailure = (error) => ({
  type: FETCH_BOOK_COUNTS_FAILURE,
  payload: error,
});


export const fetchCountsRequest = () => ({
  type: FETCH_COUNTS_REQUEST
});

export const fetchCountsSuccess = (counts) => ({
  type: FETCH_COUNTS_SUCCESS,
  payload: counts
});

export const fetchCountsFailure = (error) => ({
  type: FETCH_COUNTS_FAILURE,
  payload: error
});


  