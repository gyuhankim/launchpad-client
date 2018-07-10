import {API_BASE_URL} from '../config.js'
import {normalizeResponseErrors} from './utils';

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

  return fetch(`${API_BASE_URL}/games`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(games => dispatch(fetchGamesSuccess(games)))
  .catch(err => dispatch(fetchGamesError(err)))
}

export const FETCH_ONE_GAME_REQUEST = 'FETCH_ONE_GAME_REQUEST';
export const fetchOneGameRequest = () => ({
  type: FETCH_ONE_GAME_REQUEST
})

export const FETCH_ONE_GAME_SUCCESS = 'FETCH_ONE_GAME_SUCCESS';
export const fetchOneGameSuccess = game => ({
  type: FETCH_ONE_GAME_SUCCESS,
  game
})

export const FETCH_ONE_GAME_ERROR = 'FETCH_ONE_GAME_ERROR';
export const fetchOneGameError = error => ({
  type: FETCH_ONE_GAME_ERROR,
  error
})

export const fetchOneGame = (gameId) => (dispatch) => {
  dispatch(fetchOneGameRequest());

  return fetch(`${API_BASE_URL}/games/${gameId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(game => dispatch(fetchOneGameSuccess(game)))
  .catch(err => dispatch(fetchOneGameError(err)))
}