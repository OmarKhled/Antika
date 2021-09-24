import {
  REQUEST_PRODUCT,
  REQUEST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_FAIL,
} from "../../types/productTypes";

const productReducers = (
  state = {
    loading: false,
    product: {
      img: {
        src: [],
      },
      name: {},
      description: {},
      category: {
        name: {},
      },
      brand: {},
      specifications: {
        features: [{}, {}],
      },
    },
    alerts: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }

    case REQUEST_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        product: payload,
      };
    }

    case REQUEST_PRODUCT_FAIL: {
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

export default productReducers;
