import axios from "axios";
import {
  REQUEST_PRODUCT,
  REQUEST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_FAIL,
} from "../../types/productTypes";

export const getProduct = (id) => async (dispatch) => {
  dispatch({
    type: REQUEST_PRODUCT,
  });

  try {
    const { data } = await axios.get(`/api/products/${id}`);

    if (!data.product) {
      dispatch({
        type: REQUEST_PRODUCT_FAIL,
        payload: "No Products found...",
      });
    }

    dispatch({
      type: REQUEST_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: REQUEST_PRODUCT_FAIL,
      payload: "Server Error",
    });
  }
};
