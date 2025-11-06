import { useMemo } from 'react';
import { Phrase } from '../../core/entities/Phrase';
import { normalizeSearchTerm, createSearchRegex } from '../../utils/helpers';

const MIN_SEARCH_LENGTH = 2;

export const useFilteredPhrases = (phrases: Phrase[], searchTerm: string): Phrase[] => {
  return useMemo(() => {
    const normalizedTerm = normalizeSearchTerm(searchTerm);

    if (normalizedTerm.length < MIN_SEARCH_LENGTH) {
      return phrases;
    }

    const searchRegex = createSearchRegex(normalizedTerm);
    if (!searchRegex) {
      return phrases;
    }

    return phrases.filter((phrase) => searchRegex.test(phrase.text));
  }, [phrases, searchTerm]);
};
