import { escapeRegExp, normalizeSearchTerm, createSearchRegex } from '../regexUtils';

describe('regexUtils', () => {
  describe('escapeRegExp', () => {
    it('should escape special regex characters', () => {
      expect(escapeRegExp('test (hello)')).toBe('test \\(hello\\)');
      expect(escapeRegExp('test [hello]')).toBe('test \\[hello\\]');
      expect(escapeRegExp('test {hello}')).toBe('test \\{hello\\}');
      expect(escapeRegExp('test*hello')).toBe('test\\*hello');
      expect(escapeRegExp('test+hello')).toBe('test\\+hello');
      expect(escapeRegExp('test?hello')).toBe('test\\?hello');
      expect(escapeRegExp('test.hello')).toBe('test\\.hello');
      expect(escapeRegExp('test^hello')).toBe('test\\^hello');
      expect(escapeRegExp('test$hello')).toBe('test\\$hello');
      expect(escapeRegExp('test|hello')).toBe('test\\|hello');
      expect(escapeRegExp('test\\hello')).toBe('test\\\\hello');
    });

    it('should handle multiple special characters', () => {
      expect(escapeRegExp('(test.*+?)')).toBe('\\(test\\.\\*\\+\\?\\)');
    });

    it('should not modify regular text', () => {
      expect(escapeRegExp('hello world')).toBe('hello world');
    });
  });

  describe('normalizeSearchTerm', () => {
    it('should trim whitespace', () => {
      expect(normalizeSearchTerm('  hello  ')).toBe('hello');
      expect(normalizeSearchTerm('\thello\t')).toBe('hello');
      expect(normalizeSearchTerm('\nhello\n')).toBe('hello');
    });

    it('should collapse multiple spaces into one', () => {
      expect(normalizeSearchTerm('hello   world')).toBe('hello world');
      expect(normalizeSearchTerm('hello     world     test')).toBe('hello world test');
    });

    it('should handle mixed whitespace', () => {
      expect(normalizeSearchTerm('  hello   world  ')).toBe('hello world');
      expect(normalizeSearchTerm('\t hello  \n  world \t')).toBe('hello world');
    });

    it('should return empty string for only whitespace', () => {
      expect(normalizeSearchTerm('   ')).toBe('');
      expect(normalizeSearchTerm('\t\n  ')).toBe('');
    });

    it('should not modify already normalized text', () => {
      expect(normalizeSearchTerm('hello world')).toBe('hello world');
    });
  });

  describe('createSearchRegex', () => {
    it('should create case-insensitive regex for valid terms', () => {
      const regex = createSearchRegex('hello');
      expect(regex).toBeInstanceOf(RegExp);
      expect(regex?.test('Hello')).toBe(true);
      expect(regex?.test('HELLO')).toBe(true);
      expect(regex?.test('hello')).toBe(true);
    });

    it('should return null for empty normalized terms', () => {
      expect(createSearchRegex('   ')).toBeNull();
      expect(createSearchRegex('')).toBeNull();
    });

    it('should normalize and escape special characters', () => {
      const regex = createSearchRegex('  test (hello)  ');
      expect(regex?.test('test (hello)')).toBe(true);
      expect(regex?.test('test (world)')).toBe(false);
    });

    it('should handle all special regex characters', () => {
      const specialChars = ['(', ')', '[', ']', '{', '}', '*', '+', '?', '.', '^', '$', '|', '\\'];

      specialChars.forEach((char) => {
        const regex = createSearchRegex(char);
        expect(regex?.test(char)).toBe(true);
      });
    });

    it('should collapse spaces before creating regex', () => {
      const regex = createSearchRegex('hello   world');
      expect(regex?.test('hello world')).toBe(true);
      expect(regex?.test('hello   world')).toBe(false);
    });
  });
});
