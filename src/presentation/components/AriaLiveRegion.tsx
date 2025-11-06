import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface AriaLiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

const AriaLiveRegionComponent: React.FC<AriaLiveRegionProps> = ({ message, politeness = 'polite' }) => {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container} role="status" aria-live={politeness} aria-atomic="true">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -10000,
    width: 1,
    height: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 0,
  },
});

export const AriaLiveRegion = memo(AriaLiveRegionComponent);
