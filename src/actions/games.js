import {API_BASE_URL} from '../config.js'
import {normalizeResponseErrors} from './utils';

// Initial Fetch Of 24 Games //
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

export const fetchGames = () => dispatch => {
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



// Fetch Additional 24 Games //
export const FETCH_MORE_GAMES_REQUEST = 'FETCH_MORE_GAMES_REQUEST';
export const fetchMoreGamesRequest = () => ({
  type: FETCH_MORE_GAMES_REQUEST
})

export const FETCH_MORE_GAMES_SUCCESS = 'FETCH_MORE_GAMES_SUCCESS';
export const fetchMoreGamesSuccess = moreGames => ({
  type: FETCH_MORE_GAMES_SUCCESS,
  moreGames
})

export const FETCH_MORE_GAMES_ERROR = 'FETCH_MORE_GAMES_ERROR';
export const fetchMoreGamesError = error => ({
  type: FETCH_MORE_GAMES_ERROR,
  error
})

export const fetchMoreGames = (pageCount) => (dispatch) => {
  dispatch(fetchMoreGamesRequest());

  return fetch(`${API_BASE_URL}/games`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'pageNum': pageCount
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(games => dispatch(fetchMoreGamesSuccess(games)))
  .catch(err => dispatch(fetchMoreGamesError(err)))
}

// Push selected platform to state //
export const GRAB_PLATFORM = 'GRAB_PLATFORM';
export const grabPlatform = platform => ({
  type: GRAB_PLATFORM,
  platform
})

// Fetch A Single Game Based On GameID //
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

export const FILTER_GAMES = 'FILTER_GAMES';
export const filterGames = searchTerm => ({
  type: FILTER_GAMES,
  searchTerm
})