import { createStore } from 'redux';
import nameReducer from './Reducers/index';

const store = createStore(nameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;