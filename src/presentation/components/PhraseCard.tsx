import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Platform } from 'react-native';
import { Phrase } from '../../core/entities/Phrase';
import { ConfirmModal } from './ConfirmModal';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';
import { normalizeSearchTerm, escapeRegExp } from '../../utils/helpers';

interface PhraseCardProps {
  phrase: Phrase;
  onDelete: (id: string) => void;
  searchTerm?: string;
}

const PhraseCardComponent: React.FC<PhraseCardProps> = ({ phrase, onDelete, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isWeb = Platform.OS === 'web';
  const isLongText = phrase.text.length > 150;

  const handleDeletePress = (): void => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (): void => {
    setShowDeleteModal(false);
    onDelete(phrase.id);
  };

  const handleCancelDelete = (): void => {
    setShowDeleteModal(false);
  };

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  const renderHighlightedText = (): React.ReactNode => {
    const normalizedTerm = normalizeSearchTerm(searchTerm || '');

    if (!normalizedTerm || normalizedTerm.length < 2) {
      return <Text style={styles.text}>{phrase.text}</Text>;
    }

    const escapedTerm = escapeRegExp(normalizedTerm);
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const parts = phrase.text.split(regex);

    return (
      <Text style={styles.text}>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <Text key={index} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const phrasePreview = phrase.text.length > 50 ? phrase.text.substring(0, 50) + '...' : phrase.text;

  const cardProps = isWeb ? { role: 'article' as any } : {};

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed, isWeb && styles.cardWeb, isWeb && isExpanded && styles.cardExpanded]}
        accessibilityLabel={`Phrase: ${phrasePreview}. Created ${formatDate(phrase.createdAt)}`}
        {...cardProps}
      >
        <View style={styles.content}>
          <View style={[isWeb && !isExpanded && styles.textContainerCollapsed]} accessibilityRole="text">
            {renderHighlightedText()}
          </View>
          {isWeb && isLongText && (
            <TouchableOpacity
              onPress={toggleExpand}
              style={styles.expandButton}
              accessibilityRole="button"
              accessibilityLabel={isExpanded ? 'Show less' : 'Show more'}
            >
              <Text style={styles.expandButtonText}>{isExpanded ? '▲ Show less' : '▼ Show more'}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.date} accessibilityRole="text" accessibilityLabel={`Created ${formatDate(phrase.createdAt)}`}>
            {formatDate(phrase.createdAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Delete phrase"
          accessibilityHint="Opens confirmation dialog"
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </Pressable>

      <ConfirmModal
        visible={showDeleteModal}
        title="Delete Phrase?"
        message="Are you sure you want to delete this phrase? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardWeb: {
    minHeight: 180,
    maxHeight: 180,
  },
  cardExpanded: {
    maxHeight: 'none' as any,
    minHeight: 180,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flex: 1,
    marginRight: spacing.md,
  },
  textContainerCollapsed: {
    maxHeight: 96,
    overflow: 'hidden' as any,
  },
  text: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  expandButton: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  expandButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  highlight: {
    backgroundColor: '#FFF4CC',
    color: colors.text,
    fontWeight: '600',
  },
  date: {
    ...typography.caption,
    color: colors.textLight,
    fontSize: 12,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 20,
    fontWeight: '700',
  },
});

export const PhraseCard = memo(
  PhraseCardComponent,
  (prevProps, nextProps) => prevProps.phrase.id === nextProps.phrase.id && prevProps.searchTerm === nextProps.searchTerm
);
