export const RECIEVE_STATS = 'RECIEVE_STATS';
export const STATS_QUERY_ERR = 'STATS_QUERY_ERR';
export const READY_STATS = 'READY_STATS';
export const REQUEST_STATS = 'REQUEST_STATS';

export const initialState = {
  isFetched: false,
  isLoading: false,
  error: '',
  hasError: false,
  data: [],
};

export default function hubReducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVE_STATS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        isFetched: true,
        data: action.payload.data,
      };
    case STATS_QUERY_ERR:
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case READY_STATS:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case REQUEST_STATS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
