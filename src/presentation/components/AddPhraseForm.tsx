import React, { useState, memo } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';

interface AddPhraseFormProps {
  onSubmit: (text: string) => Promise<void>;
  loading: boolean;
}

const AddPhraseFormComponent: React.FC<AddPhraseFormProps> = ({ onSubmit, loading }) => {
  const [text, setText] = useState('');
  const [localError, setLocalError] = useState('');
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const handleSubmit = async (): Promise<void> => {
    if (!text.trim()) {
      setLocalError('Phrase cannot be empty');
      return;
    }

    if (text.trim().length < 3) {
      setLocalError('Phrase must be at least 3 characters');
      return;
    }

    if (text.length > 500) {
      setLocalError('Phrase cannot exceed 500 characters');
      return;
    }

    setLocalError('');
    await onSubmit(text);
    setText('');
  };

  const handleTextChange = (value: string): void => {
    setText(value);
    if (localError) setLocalError('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isMobile && styles.inputContainerMobile]}>
        <TextInput
          style={[styles.input, localError && styles.inputError, isMobile && styles.inputMobile]}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Enter a new phrase..."
          placeholderTextColor={colors.textLight}
          multiline
          maxLength={500}
          editable={!loading}
          numberOfLines={isMobile ? 4 : 1}
          textAlignVertical="top"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled, isMobile && styles.buttonMobile]}
          onPress={handleSubmit}
          disabled={loading || !text.trim()}
        >
          {loading ? <ActivityIndicator color={colors.surface} size="small" /> : <Text style={styles.buttonText}>Add</Text>}
        </TouchableOpacity>
      </View>
      {localError && <Text style={styles.errorText}>{localError}</Text>}
      <Text style={styles.charCount}>{text.length}/500</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputContainerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
    maxHeight: 120,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    fontSize: 16,
    outlineStyle: 'none' as any,
  },
  inputMobile: {
    minHeight: 100,
    maxHeight: 200,
    flex: 0,
  },
  inputError: {
    borderColor: colors.error,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonMobile: {
    width: '100%',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.textLight,
    shadowOpacity: 0,
  },
  buttonText: {
    ...typography.button,
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
  charCount: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'right',
    marginTop: spacing.sm,
    marginRight: spacing.xs,
  },
});

export const AddPhraseForm = memo(AddPhraseFormComponent);
