import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.errorLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  message: {
    ...typography.bodySmall,
    color: colors.error,
    flex: 1,
  },
  dismissButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  dismissText: {
    color: colors.error,
    fontSize: 18,
    fontWeight: '600',
  },
});

export const ErrorMessage = memo(ErrorMessageComponent);
