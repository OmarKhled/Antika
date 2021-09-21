import { ADD_ITEM, INCREMENT_QTY } from "../types/cartTypes";

export const cartAdd =
  (product, isPreview = false) =>
  (dispatch, getState) => {
    try {
      const item = getState().cart.items.find(
        (item) =>
          item.product._id === product._id && item.isPreview === isPreview
      );
      console.log(item);
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
