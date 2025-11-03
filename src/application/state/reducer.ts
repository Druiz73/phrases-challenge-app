import { AppState, Action } from './types';

export const initialState: AppState = {
  phrases: [],
  searchTerm: '',
  loading: false,
  error: null,
};

export function phraseReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_PHRASES_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOAD_PHRASES_SUCCESS':
      return {
        ...state,
        phrases: action.payload,
        loading: false,
        error: null,
      };

    case 'LOAD_PHRASES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ADD_PHRASE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'ADD_PHRASE_SUCCESS':
      return {
        ...state,
        phrases: [action.payload, ...state.phrases],
        loading: false,
        error: null,
      };

    case 'ADD_PHRASE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'DELETE_PHRASE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'DELETE_PHRASE_SUCCESS':
      return {
        ...state,
        phrases: state.phrases.filter((p) => p.id !== action.payload),
        loading: false,
        error: null,
      };

    case 'DELETE_PHRASE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
