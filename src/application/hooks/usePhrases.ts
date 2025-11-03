import { useCallback } from 'react';
import { usePhraseContext } from '../state/PhraseContext';

export const usePhrases = () => {
  const { state, dispatch, service } = usePhraseContext();

  const addPhrase = useCallback(
    async (text: string) => {
      dispatch({ type: 'ADD_PHRASE_START' });
      const result = await service.addPhrase(text);

      if (result.success) {
        dispatch({ type: 'ADD_PHRASE_SUCCESS', payload: result.data });
      } else {
        dispatch({ type: 'ADD_PHRASE_ERROR', payload: result.error });
      }

      return result;
    },
    [service, dispatch]
  );

  const deletePhrase = useCallback(
    async (id: string) => {
      dispatch({ type: 'DELETE_PHRASE_START' });
      const result = await service.deletePhrase(id);

      if (result.success) {
        dispatch({ type: 'DELETE_PHRASE_SUCCESS', payload: id });
      } else {
        dispatch({ type: 'DELETE_PHRASE_ERROR', payload: result.error });
      }

      return result;
    },
    [service, dispatch]
  );

  const setSearchTerm = useCallback(
    (term: string) => {
      dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  return {
    phrases: state.phrases,
    searchTerm: state.searchTerm,
    loading: state.loading,
    error: state.error,
    addPhrase,
    deletePhrase,
    setSearchTerm,
    clearError,
  };
};
