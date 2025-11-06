import { Phrase } from '../../core/entities/Phrase';
import { normalizeSearchTerm, createSearchRegex } from '../../utils/helpers';

const MIN_SEARCH_LENGTH = 2;

export const selectFilteredPhrases = (phrases: Phrase[], searchTerm: string): Phrase[] => {
  const normalizedTerm = normalizeSearchTerm(searchTerm);

  if (normalizedTerm.length < MIN_SEARCH_LENGTH) {
    return phrases;
  }

  const searchRegex = createSearchRegex(normalizedTerm);
  if (!searchRegex) {
    return phrases;
  }

  return phrases.filter((phrase) => searchRegex.test(phrase.text));
};

export const selectPhrasesCount = (phrases: Phrase[]): number => {
  return phrases.length;
};

export const selectHasSearchResults = (phrases: Phrase[], searchTerm: string): boolean => {
  const normalizedTerm = normalizeSearchTerm(searchTerm);
  return normalizedTerm.length >= MIN_SEARCH_LENGTH && phrases.length === 0;
};
