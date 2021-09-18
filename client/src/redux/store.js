import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import productsReducers from "./Products/batch/productsReducers";
import productReducers from "./Products/single/singleProductReducer";

const reducers = combineReducers({
  products: productsReducers,
  product: productReducers,
});

const middleWares = [thunk];

const initialState = {};

const store = async () => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares))
  );
};

export default store;
