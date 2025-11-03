import React, { useCallback, useTransition } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhrases } from '../../application/hooks/usePhrases';
import { useFilteredPhrases } from '../../application/hooks/useFilteredPhrases';
import { useDebounce } from '../../application/hooks/useDebounce';
import { Header } from '../components/Header';
import { PhraseGrid } from '../components/PhraseGrid';
import { SearchBar } from '../components/SearchBar';
import { AddPhraseForm } from '../components/AddPhraseForm';
import { ErrorMessage } from '../components/ErrorMessage';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';

export const HomeScreen: React.FC = () => {
  const { phrases, searchTerm, loading, error, addPhrase, deletePhrase, setSearchTerm, clearError } = usePhrases();

  const [isPending, startTransition] = useTransition();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredPhrases = useFilteredPhrases(phrases, debouncedSearchTerm);

  const handleAddPhrase = useCallback(
    async (text: string) => {
      await addPhrase(text);
    },
    [addPhrase]
  );

  const handleDeletePhrase = useCallback(
    (id: string) => {
      deletePhrase(id);
    },
    [deletePhrase]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      startTransition(() => {
        setSearchTerm(text);
      });
    },
    [setSearchTerm]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <View style={styles.formSection}>
        <AddPhraseForm onSubmit={handleAddPhrase} loading={loading} />
        <SearchBar value={searchTerm} onChangeText={handleSearchChange} />
      </View>
      {error && <ErrorMessage message={error.message} onDismiss={clearError} />}
      <View style={styles.content}>
        <PhraseGrid phrases={filteredPhrases} onDeletePhrase={handleDeletePhrase} searchTerm={debouncedSearchTerm} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  formSection: {
    backgroundColor: colors.surface,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
});
