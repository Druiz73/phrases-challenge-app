import { useMemo } from 'react';
import { Phrase } from '../../core/entities/Phrase';

export const useFilteredPhrases = (phrases: Phrase[], searchTerm: string): Phrase[] => {
  return useMemo(() => {
    if (!searchTerm.trim()) {
      return phrases;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    return phrases.filter((phrase) => phrase.text.toLowerCase().includes(lowerCaseSearch));
  }, [phrases, searchTerm]);
};
