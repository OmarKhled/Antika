import axios from "axios";
import {
  ADD_ITEM,
  CHANGE_QTY,
  DELETE_ITEM,
  INCREMENT_QTY,
} from "../types/cartTypes";

export const cartAdd =
  (product, isPreview = false) =>
  (dispatch, getState) => {
    try {
      const item = getState().cart.items.find(
        (item) =>
          item.product._id === product._id && item.isPreview === isPreview
      );
      if (item) {
        if (item.product.inStock >= item.qty + 1 && item.qty + 1 <= 5) {
          dispatch({
            type: INCREMENT_QTY,
            payload: { _id: item.product._id, isPreview: item.isPreview },
          });
          let ls = JSON.parse(localStorage.getItem("cart"));
          ls = ls.map((unit) => {
            // console.log(unit._id === item._id && unit.isPreview === isPreview);
            if (
              unit._id === item.product._id &&
              item.isPreview === unit.isPreview
            ) {
              return {
                _id: unit._id,
                qty: unit.qty + 1,
                isPreview: unit.isPreview,
              };
            } else {
              return unit;
            }
          });
          // console.log(ls);
          localStorage.setItem("cart", JSON.stringify(ls));
        }
      } else {
        let nProduct = JSON.parse(JSON.stringify(product));
        if (isPreview) {
          nProduct.price = 30;
        }
        dispatch({
          type: ADD_ITEM,
          payload: { product: nProduct, isPreview: isPreview },
        });
        let ls = JSON.parse(localStorage.getItem("cart"));
        ls.push({ _id: nProduct._id, qty: 1, isPreview: isPreview });
        localStorage.setItem("cart", JSON.stringify(ls));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const deleteProduct = (_id, isPreview) => (dispatch, getState) => {
  const { items } = getState().cart;
  const found = items.find(
    (item) => item.product._id === _id && item.isPreview === isPreview
  );
  if (found) {
    dispatch({
      type: DELETE_ITEM,
      payload: { _id, isPreview },
    });
    let ls = JSON.parse(localStorage.getItem("cart"));
    ls = ls.filter(
      (unit) => !(unit._id === _id && unit.isPreview === isPreview)
    );
    localStorage.setItem("cart", JSON.stringify(ls));
  }
};

export const changeQty =
  (_id, isPreview, qty) => async (dispatch, getState) => {
    try {
      const {
        data: { product },
      } = await axios.get(`/api/products/${_id}`);

      if (product) {
        if (qty <= product.inStock && qty <= 5) {
          dispatch({
            type: CHANGE_QTY,
            payload: { _id, isPreview, qty },
          });
          let ls = JSON.parse(localStorage.getItem("cart"));
          ls = ls.map((unit) => {
            if (unit._id === _id && unit.isPreview === isPreview) {
              return { ...unit, qty: qty };
            } else {
              return unit;
            }
          });
          localStorage.setItem("cart", JSON.stringify(ls));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
