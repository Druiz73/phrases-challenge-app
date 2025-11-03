import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';
import { AppState, Action } from './types';
import { phraseReducer, initialState } from './reducer';
import { PhraseService } from '../services/PhraseService';

interface PhraseContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  service: PhraseService;
}

const PhraseContext = createContext<PhraseContextValue | undefined>(undefined);

interface PhraseProviderProps {
  children: React.ReactNode;
  service: PhraseService;
}

export const PhraseProvider: React.FC<PhraseProviderProps> = ({ children, service }) => {
  const [state, dispatch] = useReducer(phraseReducer, initialState);

  const loadPhrases = useCallback(async () => {
    dispatch({ type: 'LOAD_PHRASES_START' });
    const result = await service.getAllPhrases();

    if (result.success) {
      dispatch({ type: 'LOAD_PHRASES_SUCCESS', payload: result.data });
    } else {
      dispatch({ type: 'LOAD_PHRASES_ERROR', payload: result.error });
    }
  }, [service]);

  useEffect(() => {
    loadPhrases();
  }, [loadPhrases]);

  const value = {
    state,
    dispatch,
    service,
  };

  return <PhraseContext.Provider value={value}>{children}</PhraseContext.Provider>;
};

export const usePhraseContext = (): PhraseContextValue => {
  const context = useContext(PhraseContext);
  if (!context) {
    throw new Error('usePhraseContext must be used within a PhraseProvider');
  }
  return context;
};
