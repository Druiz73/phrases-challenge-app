import React, { memo } from 'react';
import { FlatList, StyleSheet, View, Text, useWindowDimensions, Platform } from 'react-native';
import { Phrase } from '../../core/entities/Phrase';
import { PhraseCard } from './PhraseCard';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';

interface PhraseGridProps {
  phrases: Phrase[];
  onDeletePhrase: (id: string) => void;
  searchTerm?: string;
}

const PhraseGridComponent: React.FC<PhraseGridProps> = ({ phrases, onDeletePhrase, searchTerm }) => {
  const { width } = useWindowDimensions();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const getNumColumns = (): number => {
    if (width < 600) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  const renderItem = ({ item }: { item: Phrase }): React.ReactElement => (
    <View style={[styles.cardWrapper, { width: `${100 / numColumns}%` }]}>
      <PhraseCard phrase={item} onDelete={onDeletePhrase} searchTerm={searchTerm} />
    </View>
  );

  const renderEmpty = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>{searchTerm ? 'No phrases found' : 'No phrases yet'}</Text>
      <Text style={styles.emptySubtitle}>{searchTerm ? 'Try a different search term' : 'Add your first phrase to get started'}</Text>
    </View>
  );

  return (
    <FlatList
      data={phrases}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      key={numColumns}
      contentContainerStyle={styles.container}
      ListEmptyComponent={renderEmpty}
      removeClippedSubviews={true}
      maxToRenderPerBatch={isMobile ? 5 : 10}
      windowSize={5}
      initialNumToRender={isMobile ? 5 : 10}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flexGrow: 1,
  },
  cardWrapper: {
    padding: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export const PhraseGrid = memo(PhraseGridComponent);
