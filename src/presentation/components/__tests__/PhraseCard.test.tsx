import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PhraseCard } from '../PhraseCard';
import { Phrase } from '../../../core/entities/Phrase';

describe('PhraseCard', () => {
  const mockPhrase: Phrase = {
    id: '1',
    text: 'Test phrase for testing',
    createdAt: Date.now(),
  };

  const mockOnDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render phrase text', () => {
    const { getByText } = render(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    expect(getByText('Test phrase for testing')).toBeTruthy();
  });

  it('should call onDelete when delete is confirmed in modal', () => {
    const { getByText, getAllByText } = render(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);

    const deleteButton = getByText('✕');
    fireEvent.press(deleteButton);

    const confirmButton = getByText('Delete');
    fireEvent.press(confirmButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockPhrase.id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should not call onDelete when cancel is pressed in modal', () => {
    const { getByText } = render(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);

    const deleteButton = getByText('✕');
    fireEvent.press(deleteButton);

    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('should highlight search term', () => {
    const { getByText } = render(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} searchTerm="test" />);

    const highlightedText = getByText('Test');
    expect(highlightedText).toBeTruthy();
  });

  it('should render without search term', () => {
    const { getByText } = render(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);

    expect(getByText('Test phrase for testing')).toBeTruthy();
  });

  it('should display relative time for recent phrases', () => {
    const recentPhrase: Phrase = {
      ...mockPhrase,
      createdAt: Date.now() - 5 * 60 * 1000, // 5 minutes ago
    };

    const { getByText } = render(<PhraseCard phrase={recentPhrase} onDelete={mockOnDelete} />);

    expect(getByText('5m ago')).toBeTruthy();
  });
});
