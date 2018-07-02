import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import gamesReducer from './reducers/games';

const store = createStore(
  combineReducers({
    game: gamesReducer
  }),
  applyMiddleware(thunk)
)

export default store;