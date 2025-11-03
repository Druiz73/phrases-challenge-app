import { Phrase } from '../../core/entities/Phrase';

export interface AppState {
  phrases: Phrase[];
  searchTerm: string;
  loading: boolean;
  error: Error | null;
}

export type Action =
  | { type: 'LOAD_PHRASES_START' }
  | { type: 'LOAD_PHRASES_SUCCESS'; payload: Phrase[] }
  | { type: 'LOAD_PHRASES_ERROR'; payload: Error }
  | { type: 'ADD_PHRASE_START' }
  | { type: 'ADD_PHRASE_SUCCESS'; payload: Phrase }
  | { type: 'ADD_PHRASE_ERROR'; payload: Error }
  | { type: 'DELETE_PHRASE_START' }
  | { type: 'DELETE_PHRASE_SUCCESS'; payload: string }
  | { type: 'DELETE_PHRASE_ERROR'; payload: Error }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'CLEAR_ERROR' };
