import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@theme/colors';
import { useTheme } from '@hooks/useTheme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'secondary':
        return colors.secondary;
      case 'danger':
        return colors.error;
      case 'success':
        return colors.success;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return SPACING.md;
      case 'large':
        return SPACING.xl;
      case 'medium':
      default:
        return SPACING.lg;
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      paddingVertical: getPadding(),
      paddingHorizontal: SPACING.lg,
      borderRadius: BORDER_RADIUS.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: fullWidth ? '100%' : 'auto',
    },
    text: {
      color: variant === 'secondary' ? colors.text : '#FFFFFF',
      fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
      fontWeight: '600',
      marginLeft: loading ? SPACING.md : 0,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.button}
    >
      {loading && <ActivityIndicator color="#FFFFFF" size="small" />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
