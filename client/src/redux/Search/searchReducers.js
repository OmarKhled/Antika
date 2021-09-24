import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAIL,
  CLEAR_ALERTS,
} from "../types/searchTypes";

const searchReducers = (
  state = {
    loading: false,
    results: [],
    alerts: [],
    query: {},
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_SEARCH: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: payload,
      };
    }
    case REQUEST_SEARCH_FAIL: {
      return {
        ...state,
        loading: false,
        alerts: [...state.alerts, payload],
        results: [],
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        alerts: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default searchReducers;
