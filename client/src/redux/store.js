import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import initInitialState from "./initInitialState";

import productsReducers from "./Products/batch/productsReducers";
import productReducers from "./Products/single/singleProductReducer";
import searchReducers from "./Search/searchReducers";
import cartReducers from "./Cart/cartReducers";

const reducers = combineReducers({
  products: productsReducers,
  product: productReducers,
  search: searchReducers,
  cart: cartReducers,
});

const middleWares = [thunk];

const store = async () => {
  const initialState = await initInitialState();
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares))
  );
};

export default store;
