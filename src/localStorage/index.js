/* global localStorage */
import * as SecureStore from 'expo-secure-store'
import { Either, pipe, curry, partial } from '@versita/fp-lib'

const storageEngine = SecureStore.isAvailableAsync() ? SecureStore : localStorage

/**
 * Pure version of localStorage.getItem that won't throw
 *
 * @param key localStorage property to retrieve
 * @returns Either error deserialized value
 */
export const getItem = (key) => {
  return Either.tryCatch(
    () => pipe(
      storageEngine.getItem.bind(storageEngine),
      String,
      JSON.parse.bind(JSON)
    )(key),
    (reason) => new Error(String(reason))
  )
}

/**
 * Curried, pure version of localStorage.setItem that won't throw
 *
 * @Remarks curried
 * @param key localStorage property to set
 * @param value value to serialize and write to localStorage
 * @returns Either error or null
 */
export const setItem = curry((key, value) => {
  return Either.tryCatch(
    () => {
      const writeToLS = partial(storageEngine.setItem.bind(storageEngine), [key])
      pipe(
        JSON.stringify.bind(JSON),
        writeToLS
      )(value)
    },
    (reason) => new Error(String(reason))
  )
})

/**
 * Delete locally-stored item by key
 *
 * @param key storage property to remove
 * @returns Either error or void
 */
export const removeItem = (key) => {
  return Either.tryCatch(
    () => storageEngine.removeItem.bind(storageEngine)(key),
    (reason) => new Error(String(reason))
  )
}

export default storageEngine
