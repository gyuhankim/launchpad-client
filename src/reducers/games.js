import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR
} from '../actions/games';

const initialState = {
  games: [],
  loading: false,
  error: null
}

export default function gamesReducer(state = initialState, action) {

  switch (action.type) {
    
    case FETCH_GAMES_REQUEST:
    return {
      ...state,
      loading: true
    }
    
    case FETCH_GAMES_SUCCESS:
    return {
      ...state,
      games: action.games,
      loading: false,
      error: null
    }

    case FETCH_GAMES_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error
    }

    default:
      return state;

  }
}