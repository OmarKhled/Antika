import { ADD_ITEM, INCREMENT_QTY } from "../types/cartTypes";

const cartReducers = (oState = { items: [] }, action) => {
  const { type, payload } = action;
  const state = JSON.parse(JSON.stringify(oState));

  switch (type) {
    case ADD_ITEM: {
      return {
        ...oState,
        items: [
          ...oState.items,
          { product: payload.product, qty: 1, isPreview: payload.isPreview },
        ],
      };
    }

    case INCREMENT_QTY: {
      const items = state.items.map((item) => {
        if (
          item.product._id === payload._id &&
          item.isPreview === payload.isPreview
        ) {
          return {
            product: item.product,
            qty: item.qty + 1,
            isPreview: item.isPreview,
          };
        } else {
          return item;
        }
      });
      return {
        ...oState,
        items,
      };
    }
    default: {
      return oState;
    }
  }
};

export default cartReducers;
