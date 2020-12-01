import { StyleSheet } from 'react-native'
import { pipe, pickBy, values } from 'ramda'

export const composeStyles = spec => {
  const styleIsRequired = (_val, key) => spec[key]
  return pipe(
    pickBy(styleIsRequired),
    values,
    StyleSheet.compose
  )
}
