import React, { memo } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search phrases...' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Text style={styles.clearButton} onPress={() => onChangeText('')}>
          ✕
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.borderLight,
    minHeight: 52,
  },
  icon: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    padding: 0,
    fontSize: 16,
  },
  clearButton: {
    fontSize: 22,
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
    fontWeight: '600',
  },
});

export const SearchBar = memo(SearchBarComponent);
