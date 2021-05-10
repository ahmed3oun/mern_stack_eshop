import { createStore , combineReducers , applyMiddleware, compose    } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productReducer";

const reducer = combineReducers({
     productsReducer
})
//let initialState = {}
/* const middleware = [thunk]
const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))
 */


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store 