import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers/';

const store = createStore(
  combineReducers({
    app: appReducer
  }),
  applyMiddleware(thunk)
)

export default store;