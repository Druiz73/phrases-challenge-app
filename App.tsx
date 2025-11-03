import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PhraseProvider } from './src/application/state/PhraseContext';
import { PhraseService } from './src/application/services/PhraseService';
import { PhraseRepository } from './src/infrastructure/repositories/PhraseRepository';
import { AsyncStorageAdapter } from './src/infrastructure/storage/AsyncStorageAdapter';
import { HomeScreen } from './src/presentation/screens/HomeScreen';
import { withErrorBoundary } from './src/presentation/hoc/withErrorBoundary';

const App: React.FC = () => {
  const phraseService = useMemo(() => {
    const storage = new AsyncStorageAdapter();
    const repository = new PhraseRepository(storage);
    return new PhraseService(repository);
  }, []);

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <PhraseProvider service={phraseService}>
        <HomeScreen />
          <StatusBar style="light" />
      </PhraseProvider>
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withErrorBoundary(App);
