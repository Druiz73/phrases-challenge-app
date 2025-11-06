import React, { memo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, Platform } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { spacing } from '../../utils/constants/spacing';
import { typography } from '../theme/typography';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModalComponent: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  const confirmButtonRef = useRef<any>(null);

  useEffect(() => {
    if (visible && Platform.OS === 'web' && confirmButtonRef.current) {
      const timer = setTimeout(() => {
        (confirmButtonRef.current as any)?.focus?.();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel} aria-label="Close modal">
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
          {...(Platform.OS === 'web'
            ? {
                role: 'dialog' as any,
                'aria-modal': 'true' as any,
                'aria-labelledby': 'modal-title' as any,
              }
            : {})}
        >
          <View style={styles.modal}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon} role="img" aria-label="Warning">
                ⚠️
              </Text>
            </View>
            <Text style={styles.title} nativeID="modal-title" accessibilityRole="header">
              {title}
            </Text>
            <Text style={styles.message} accessibilityRole="text">
              {message}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel} accessibilityRole="button" accessibilityLabel={cancelText}>
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                ref={confirmButtonRef}
                style={styles.confirmButton}
                onPress={onConfirm}
                accessibilityRole="button"
                accessibilityLabel={`${confirmText} phrase`}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.textSecondary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    ...typography.button,
    color: colors.surface,
  },
});

export const ConfirmModal = memo(ConfirmModalComponent);
