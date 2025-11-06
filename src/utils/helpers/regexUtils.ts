export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const createSearchRegex = (term: string): RegExp | null => {
  const normalizedTerm = normalizeSearchTerm(term);
  if (!normalizedTerm) return null;

  const escapedTerm = escapeRegExp(normalizedTerm);
  return new RegExp(escapedTerm, 'i');
};

export const normalizeSearchTerm = (term: string): string => {
  return term.trim().replace(/\s+/g, ' ');
};
