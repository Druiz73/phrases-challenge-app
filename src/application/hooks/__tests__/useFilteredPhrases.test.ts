import { renderHook } from '@testing-library/react-native';
import { useFilteredPhrases } from '../useFilteredPhrases';
import { Phrase } from '../../../core/entities/Phrase';

describe('useFilteredPhrases', () => {
  const mockPhrases: Phrase[] = [
    { id: '1', text: 'Hello World', createdAt: Date.now() },
    { id: '2', text: 'React Native', createdAt: Date.now() },
    { id: '3', text: 'TypeScript is awesome', createdAt: Date.now() },
    { id: '4', text: 'Testing with Jest', createdAt: Date.now() },
  ];

  it('should return all phrases when search term is empty', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, ''));
    expect(result.current).toEqual(mockPhrases);
  });

  it('should filter phrases by search term (case insensitive)', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'react'));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].text).toBe('React Native');
  });

  it('should handle search with uppercase', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'TYPESCRIPT'));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].text).toBe('TypeScript is awesome');
  });

  it('should return multiple matches', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'e'));
    expect(result.current.length).toBeGreaterThan(1);
  });

  it('should return empty array when no matches', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, 'xyz123'));
    expect(result.current).toHaveLength(0);
  });

  it('should handle whitespace in search term', () => {
    const { result } = renderHook(() => useFilteredPhrases(mockPhrases, '  '));
    expect(result.current).toEqual(mockPhrases);
  });

  it('should use memoization and return same reference for same inputs', () => {
    const { result, rerender } = renderHook(({ phrases, term }) => useFilteredPhrases(phrases, term), {
      initialProps: { phrases: mockPhrases, term: 'react' },
    });

    const firstResult = result.current;
    rerender({ phrases: mockPhrases, term: 'react' });
    expect(result.current).toBe(firstResult);
  });

  it('should update when search term changes', () => {
    const { result, rerender } = renderHook(({ phrases, term }) => useFilteredPhrases(phrases, term), {
      initialProps: { phrases: mockPhrases, term: 'react' },
    });

    expect(result.current).toHaveLength(1);

    rerender({ phrases: mockPhrases, term: 'test' });
    expect(result.current).toHaveLength(1);
    expect(result.current[0].text).toBe('Testing with Jest');
  });
});
