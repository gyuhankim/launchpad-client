import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {reducer as formReducer} from 'redux-form';
import gamesReducer from './reducers/games';
import authReducer from './reducers/auth';
import favoritesReducer from './reducers/favorites';
import protectedDataReducer from './reducers/protected-data';

import {setAuthToken, refreshAuthToken} from './actions/auth';
import {loadAuthToken} from './local-storage';

const store = createStore(
  combineReducers({
    games: gamesReducer,
    form: formReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    protectedData: protectedDataReducer
  }),
  applyMiddleware(thunk)
)

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;