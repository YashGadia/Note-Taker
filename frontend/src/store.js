import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/notesReducers';

const reducer = combineReducers({
    // This will contain our reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate: userUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const intialState = { 
    userLogin: {userInfo: userInfoFromStorage}
 };

const middleware = [thunk];

const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;