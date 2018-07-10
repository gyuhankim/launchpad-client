import {
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_ERROR,
} from '../actions/favorites';

const initialState = {
  favorites: [],
  loading: false,
  error: null
}

export default function favoritesReducer(state = initialState, action) {
  
  switch (action.type) {
    
    case FETCH_FAVORITES_REQUEST:
    return {
      ...state,
      loading: true
    }

    case FETCH_FAVORITES_SUCCESS:
    return {
      ...state,
      favorites: action.favorites,
      loading: false,
      error: null
    }

    case FETCH_FAVORITES_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error
    }

    default:
    return state;

  }

}