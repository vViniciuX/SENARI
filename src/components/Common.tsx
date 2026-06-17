import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@theme/colors';
import { useTheme } from '@hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, shadow = true }) => {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.lg,
      ...(shadow && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 4,
        elevation: isDark ? 4 : 2,
      }),
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message }) => {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    message: {
      marginTop: SPACING.lg,
      color: colors.textSecondary,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: SPACING.lg,
      textAlign: 'center',
    },
    message: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: SPACING.md,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

interface ErrorBoundaryProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error, onRetry }) => {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: SPACING.lg,
    },
    errorBox: {
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.error,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.error,
    },
    message: {
      fontSize: 14,
      color: colors.text,
      marginTop: SPACING.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.title}>Erro</Text>
        <Text style={styles.message}>{error}</Text>
      </View>
    </View>
  );
};
