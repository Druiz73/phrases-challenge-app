import { phraseReducer, initialState } from '../reducer';
import { Action } from '../types';
import { Phrase } from '../../../core/entities/Phrase';

describe('phraseReducer', () => {
  const mockPhrase: Phrase = {
    id: '1',
    text: 'Test phrase',
    createdAt: Date.now(),
  };

  it('should return initial state', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = phraseReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  describe('LOAD_PHRASES', () => {
    it('should handle LOAD_PHRASES_START', () => {
      const action: Action = { type: 'LOAD_PHRASES_START' };
      const state = phraseReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle LOAD_PHRASES_SUCCESS', () => {
      const phrases = [mockPhrase];
      const action: Action = { type: 'LOAD_PHRASES_SUCCESS', payload: phrases };
      const state = phraseReducer(initialState, action);

      expect(state.phrases).toEqual(phrases);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle LOAD_PHRASES_ERROR', () => {
      const error = new Error('Load failed');
      const action: Action = { type: 'LOAD_PHRASES_ERROR', payload: error };
      const state = phraseReducer(initialState, action);

      expect(state.error).toEqual(error);
      expect(state.loading).toBe(false);
    });
  });

  describe('ADD_PHRASE', () => {
    it('should handle ADD_PHRASE_SUCCESS', () => {
      const action: Action = { type: 'ADD_PHRASE_SUCCESS', payload: mockPhrase };
      const state = phraseReducer(initialState, action);

      expect(state.phrases).toHaveLength(1);
      expect(state.phrases[0]).toEqual(mockPhrase);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should add new phrase to the beginning', () => {
      const existingPhrase: Phrase = {
        id: '2',
        text: 'Existing phrase',
        createdAt: Date.now() - 1000,
      };
      const stateWithPhrase = { ...initialState, phrases: [existingPhrase] };
      const action: Action = { type: 'ADD_PHRASE_SUCCESS', payload: mockPhrase };
      const state = phraseReducer(stateWithPhrase, action);

      expect(state.phrases).toHaveLength(2);
      expect(state.phrases[0]).toEqual(mockPhrase);
      expect(state.phrases[1]).toEqual(existingPhrase);
    });
  });

  describe('DELETE_PHRASE', () => {
    it('should handle DELETE_PHRASE_SUCCESS', () => {
      const stateWithPhrase = { ...initialState, phrases: [mockPhrase] };
      const action: Action = { type: 'DELETE_PHRASE_SUCCESS', payload: mockPhrase.id };
      const state = phraseReducer(stateWithPhrase, action);

      expect(state.phrases).toHaveLength(0);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should only remove the specified phrase', () => {
      const phrase2: Phrase = { id: '2', text: 'Keep this', createdAt: Date.now() };
      const stateWithPhrases = { ...initialState, phrases: [mockPhrase, phrase2] };
      const action: Action = { type: 'DELETE_PHRASE_SUCCESS', payload: mockPhrase.id };
      const state = phraseReducer(stateWithPhrases, action);

      expect(state.phrases).toHaveLength(1);
      expect(state.phrases[0]).toEqual(phrase2);
    });
  });

  describe('SET_SEARCH_TERM', () => {
    it('should update search term', () => {
      const searchTerm = 'test';
      const action: Action = { type: 'SET_SEARCH_TERM', payload: searchTerm };
      const state = phraseReducer(initialState, action);

      expect(state.searchTerm).toBe(searchTerm);
    });
  });

  describe('CLEAR_ERROR', () => {
    it('should clear error', () => {
      const stateWithError = { ...initialState, error: new Error('Test error') };
      const action: Action = { type: 'CLEAR_ERROR' };
      const state = phraseReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });
});
