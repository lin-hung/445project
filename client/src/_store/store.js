<<<<<<< HEAD
import { createStore, compose } from "redux";
=======
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
>>>>>>> parent of 4de6980... removed redux-thunk
import rootReducer from "../_reducers/rootreducer";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  //() => [],
  initialState,
  compose(
    applyMiddleware(...middleware),
    ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose)
  ) 
);
export default store;