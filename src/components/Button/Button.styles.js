import { StyleSheet } from 'react-native'
import { theme } from '../../styles/theme'

export default StyleSheet.create({
  circle: {
    borderRadius: 50,
    padding: theme.spacing.base
  },
  disabled: {
    backgroundColor: theme.colors.grey3
  },
  disabledText: {
    color: theme.colors.white
  },
  error: {
    backgroundColor: theme.colors.error,
    borderWidth: 0
  },
  large: {
  },
  largeText: {
    fontSize: theme.typography.h3.size
  },
  loadingOverlay: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    opacity: 0.85,
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    width: '100%'
  },
  root: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    borderWidth: 0,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.small,
    position: 'relative'
  },
  secondary: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.primary,
    borderWidth: 1
  },
  secondaryText: {
    color: theme.colors.primary
  },
  small: {
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.tiny
  },
  smallText: {
    fontSize: theme.typography.small.size
  },
  success: {
    backgroundColor: theme.colors.success,
    borderWidth: 0
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.regular.size,
    fontWeight: theme.typography.weight.bold,
    lineHeight: theme.typography.regular.lineHeight
  }
})
