import { useMemo } from 'react';
import { Phrase } from '../../core/entities/Phrase';
import { selectFilteredPhrases } from '../state/selectors';

export const useFilteredPhrases = (phrases: Phrase[], searchTerm: string): Phrase[] => {
  return useMemo(() => {
    return selectFilteredPhrases(phrases, searchTerm);
  }, [phrases, searchTerm]);
};
