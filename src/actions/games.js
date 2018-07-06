import {API_BASE_URL} from '../config.js'

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
export const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
})

export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  games
})

export const FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR';
export const fetchGamesError = error => ({
  type: FETCH_GAMES_ERROR,
  error
})

export const fetchGames = () => (dispatch) => {
  dispatch(fetchGamesRequest());

  return fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(games => dispatch(fetchGamesSuccess(games)))
  .catch(err => dispatch(fetchGamesError(err)))
}