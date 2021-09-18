import {
  REQUEST_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_FAIL,
} from "../../types/productTypes";

const productsReducers = (
  state = { loading: false, products: [], alerts: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case REQUEST_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: payload,
      };
    }

    case REQUEST_PRODUCTS_FAIL: {
      return {
        ...state,
        loading: false,
        alerts: [...state.alerts, payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducers;
