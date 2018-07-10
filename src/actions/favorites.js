import {API_BASE_URL} from '../config.js'
import {normalizeResponseErrors} from './utils';

export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST
})

export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const fetchFavoritesSuccess = favorites => ({
  type: FETCH_FAVORITES_SUCCESS,
  favorites
})

export const FETCH_FAVORITES_ERROR = 'FETCH_FAVORITES_ERROR';
export const fetchFavoritesError = error => ({
  type: FETCH_FAVORITES_ERROR,
  error
})

export const fetchFavorites = () => (dispatch, getState) => {
  dispatch(fetchFavoritesRequest());

  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/favorites`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(favorites => dispatch(fetchFavoritesSuccess(favorites)))
  .catch(err => dispatch(fetchFavoritesError(err)))
}

export const ADD_FAVORITE_REQUEST = 'ADD_FAVORITE_REQUEST';
export const addFavoriteRequest = favorite => ({
  type: ADD_FAVORITE_REQUEST,
  favorite
})

export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const addFavoriteSuccess = () => ({
  type: ADD_FAVORITE_SUCCESS
})

export const ADD_FAVORITE_ERROR = 'ADD_FAVORITE_ERROR';
export const addFavoriteError = error => ({
  type: ADD_FAVORITE_ERROR,
  error
})

export const addFavorite = favorite => (dispatch, getState) => {
  dispatch(addFavoriteRequest(favorite));

  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      gameId: favorite
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => console.log(res))
  .catch(err => dispatch(addFavoriteError(err)))
}