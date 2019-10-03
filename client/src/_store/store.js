import { createStore, compose } from "redux";
import rootReducer from "../_reducers/rootreducer";

const initialState = {};
const store = createStore(
  rootReducer,
  //() => [],
  initialState,
  compose(
    ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose)
  ) 
);
export default store;