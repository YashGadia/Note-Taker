import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f)
);

export default store;



// import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // Updated import path

// import {
//   noteCreateReducer,
//   noteDeleteReducer,
//   noteListReducer,
//   noteUpdateReducer,
// } from './reducers/notesReducers';
// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userUpdateReducer,
// } from './reducers/userReducers';

// const reducer = combineReducers({
//   noteList: noteListReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   noteCreate: noteCreateReducer,
//   noteDelete: noteDeleteReducer,
//   noteUpdate: noteUpdateReducer,
//   userUpdate: userUpdateReducer,
// });

// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

// const middleware = [thunk];

// let composeEnhancers = compose;

// // Using composeWithDevTools only in development environment
// if (process.env.NODE_ENV === 'development') {
//   composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })(
//     applyMiddleware(...middleware)
//   );
// } else {
//   composeEnhancers = compose(applyMiddleware(...middleware));
// }

// const store = createStore(reducer, initialState, composeEnhancers);

// export default store;
