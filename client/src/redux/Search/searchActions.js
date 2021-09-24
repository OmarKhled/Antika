import axios from "axios";
import _ from "lodash";
import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAIL,
  CLEAR_ALERTS,
} from "../types/searchTypes";

export const requestSearch = (query, language) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SEARCH,
    });
    let {
      data: { products },
    } = await axios.get("/api/products");

    if (!products) {
      dispatch({
        type: REQUEST_SEARCH_FAIL,
        payload: "No Products Found...",
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERTS,
        });
      }, 1400);
    }

    products = products.filter((product, index) => {
      const fields = [
        _.get(product, `name.${language}`),
        _.get(product, `category.${language}`),
        _.get(product, `brand.${language}`),
      ];

      let valid = false;
      for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        if (field) {
          if (field.toLowerCase().includes(query.toLowerCase())) {
            valid = true;
          }
        }
      }
      if (valid) {
        return true;
      } else {
        return false;
      }
    });

    setTimeout(() => {
      if (products.length > 0) {
        dispatch({
          type: REQUEST_SEARCH_SUCCESS,
          payload: products,
        });
      } else {
        dispatch({
          type: REQUEST_SEARCH_FAIL,
          payload: "No Products Found...",
        });
        setTimeout(() => {
          dispatch({
            type: CLEAR_ALERTS,
          });
        }, 1400);
      }
    }, 2000);
  } catch (err) {}
};
