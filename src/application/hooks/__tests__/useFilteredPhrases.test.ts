import { renderHook } from '@testing-library/react-native';
import { useFilteredPhrases } from '../useFilteredPhrases';
import { Phrase } from '../../../core/entities/Phrase';

const mockPhrases: Phrase[] = [
  { id: '1', text: 'Hello world', createdAt: Date.now() },
  { id: '2', text: 'Testing (special) characters', createdAt: Date.now() },
  { id: '3', text: 'Array [test] brackets', createdAt: Date.now() },
  { id: '4', text: 'Regex * + ? symbols', createdAt: Date.now() },
  { id: '5', text: 'Dollar $ and caret ^', createdAt: Date.now() },
  { id: '6', text: 'Pipe | character', createdAt: Date.now() },
  { id: '7', text: 'Backslash \\ test', createdAt: Date.now() },
];

describe('useFilteredPhrases', () => {
  describe('minLength validation', () => {
    it('should return all phrases when search term is empty', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, ''));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should return all phrases when search term is only whitespace', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '   '));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should return all phrases when search term length is 1', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'a'));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should not filter when normalized term is less than 2 characters', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, ' h '));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should filter when search term length is 2 or more', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'He'));
      expect(result.current.length).toBeLessThan(mockPhrases.length);
    });
  });

  describe('text normalization', () => {
    it('should trim leading and trailing spaces', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '  world  '));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('1');
    });

    it('should collapse multiple spaces into one', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'Hello   world'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].text).toBe('Hello world');
    });

    it('should handle mixed whitespace characters', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '\tworld\n'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('1');
    });
  });

  describe('special characters handling', () => {
    it('should handle parentheses without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '(special)'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('2');
    });

    it('should handle square brackets without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '[test]'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('3');
    });

    it('should handle asterisk without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'Regex *'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('4');
    });

    it('should handle plus symbol without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '* +'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('4');
    });

    it('should handle question mark without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '+ ?'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('4');
    });

    it('should handle dollar sign without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'Dollar $'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('5');
    });

    it('should handle caret without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'caret ^'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('5');
    });

    it('should handle pipe character without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'Pipe |'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('6');
    });

    it('should handle backslash without crashing', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'Backslash \\'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].id).toBe('7');
    });

    it('should handle multiple special characters', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '(*)'));
      expect(result.current).toHaveLength(0);
    });
  });

  describe('case-insensitive search', () => {
    it('should match regardless of case', () => {
      const { result: lower } = renderHook(() => useFilteredPhrases(mockPhrases, 'hello'));
      const { result: upper } = renderHook(() => useFilteredPhrases(mockPhrases, 'HELLO'));
      const { result: mixed } = renderHook(() => useFilteredPhrases(mockPhrases, 'HeLLo'));

      expect(lower.current).toHaveLength(1);
      expect(upper.current).toHaveLength(1);
      expect(mixed.current).toHaveLength(1);
      expect(lower.current[0].id).toBe('1');
      expect(upper.current[0].id).toBe('1');
      expect(mixed.current[0].id).toBe('1');
    });
  });

  describe('filtering logic', () => {
    it('should return empty array when no matches found', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'nonexistent'));
      expect(result.current).toHaveLength(0);
    });

    it('should return multiple matches', () => {
      const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'test'));
      expect(result.current.length).toBeGreaterThan(1);
    });

    it('should memoize results', () => {
      const { result, rerender } = renderHook(({ phrases, term }) => useFilteredPhrases(phrases, term), {
        initialProps: { phrases: mockPhrases, term: 'hello' },
      });

      const firstResult = result.current;

      rerender({ phrases: mockPhrases, term: 'hello' });

      expect(result.current).toBe(firstResult);
    });

    it('should update when search term changes', () => {
      const { result, rerender } = renderHook(({ phrases, term }) => useFilteredPhrases(phrases, term), {
        initialProps: { phrases: mockPhrases, term: 'hello' },
      });

      expect(result.current).toHaveLength(1);

      rerender({ phrases: mockPhrases, term: 'test' });

      expect(result.current.length).toBeGreaterThan(1);
    });
  });
});
