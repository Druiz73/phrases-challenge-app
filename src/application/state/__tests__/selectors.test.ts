import { selectFilteredPhrases, selectPhrasesCount, selectHasSearchResults } from '../selectors';
import { Phrase } from '../../../core/entities/Phrase';

const mockPhrases: Phrase[] = [
  { id: '1', text: 'Hello world', createdAt: Date.now() },
  { id: '2', text: 'Testing React Native', createdAt: Date.now() },
  { id: '3', text: 'Selector optimization', createdAt: Date.now() },
];

describe('Selectors', () => {
  describe('selectFilteredPhrases', () => {
    it('should return all phrases when search term is empty', () => {
      const result = selectFilteredPhrases(mockPhrases, '');
      expect(result).toEqual(mockPhrases);
    });

    it('should return all phrases when search term is less than minLength', () => {
      const result = selectFilteredPhrases(mockPhrases, 'a');
      expect(result).toEqual(mockPhrases);
    });

    it('should filter phrases by search term', () => {
      const result = selectFilteredPhrases(mockPhrases, 'React');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should be case insensitive', () => {
      const result = selectFilteredPhrases(mockPhrases, 'HELLO');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should normalize whitespace', () => {
      const result = selectFilteredPhrases(mockPhrases, '  hello  ');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should handle special regex characters', () => {
      const phrasesWithSpecialChars: Phrase[] = [
        { id: '1', text: 'Test (parentheses)', createdAt: Date.now() },
        { id: '2', text: 'Test [brackets]', createdAt: Date.now() },
      ];

      const result1 = selectFilteredPhrases(phrasesWithSpecialChars, '(parentheses)');
      expect(result1).toHaveLength(1);
      expect(result1[0].id).toBe('1');

      const result2 = selectFilteredPhrases(phrasesWithSpecialChars, '[brackets]');
      expect(result2).toHaveLength(1);
      expect(result2[0].id).toBe('2');
    });

    it('should return empty array when no matches', () => {
      const result = selectFilteredPhrases(mockPhrases, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('selectPhrasesCount', () => {
    it('should return the number of phrases', () => {
      expect(selectPhrasesCount(mockPhrases)).toBe(3);
    });

    it('should return 0 for empty array', () => {
      expect(selectPhrasesCount([])).toBe(0);
    });
  });

  describe('selectHasSearchResults', () => {
    it('should return false when search term is too short', () => {
      expect(selectHasSearchResults([], 'a')).toBe(false);
    });

    it('should return true when search term is valid and no results', () => {
      expect(selectHasSearchResults([], 'test')).toBe(true);
    });

    it('should return false when there are results', () => {
      expect(selectHasSearchResults(mockPhrases, 'hello')).toBe(false);
    });

    it('should return false when search term is empty', () => {
      expect(selectHasSearchResults([], '')).toBe(false);
    });
  });
});
