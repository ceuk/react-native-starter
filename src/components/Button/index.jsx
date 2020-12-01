import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { composeStyles } from '../../styles/utils'
import PropTypes from 'prop-types'
import globalstyles from './Button.styles'
import devicestyles from './Button.devicestyles'
import { mergeDeepLeft } from 'ramda'

const styles = mergeDeepLeft(globalstyles, devicestyles)

const ButtonComponent = ({
  text,
  style,
  size,
  circle,
  secondary,
  loading,
  disabled,
  success,
  error,
  ...otherProps
}) => {
  const rootStyles = composeStyles({
    root: true,
    disabled,
    loading,
    small: size === 'small',
    large: size === 'large',
    secondary,
    circle,
    success,
    error
  })(styles)
  const textStyles = composeStyles({
    text: true,
    disabledText: disabled,
    secondaryText: secondary,
    smallText: size === 'small',
    largeText: size === 'large'
  })(styles)
  return (
    <TouchableOpacity
      {...otherProps}
      disabled={loading || disabled}
      style={StyleSheet.compose([rootStyles, style])}
    >
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color='#fff' />
        </View>
      )}
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  )
}
ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  circle: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  secondary: PropTypes.bool,
  loading: PropTypes.bool
}

export default ButtonComponent
