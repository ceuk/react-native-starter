/* global localStorage */
import * as SecureStore from 'expo-secure-store'
import { pipe, curry, Task, map } from '@versita/fp-lib'
import { promiseFromTryCatch } from '../utils'
import { Platform } from 'react-native'

const secureStoreAvailable = SecureStore.isAvailableAsync()
const storageEngine = {
  getItem: secureStoreAvailable && Platform.native ? SecureStore.getItemAsync : promiseFromTryCatch(localStorage.getItem.bind(localStorage)),
  setItem: secureStoreAvailable && Platform.native ? SecureStore.setItemAsync : promiseFromTryCatch(localStorage.setItem.bind(localStorage)),
  removeItem: secureStoreAvailable && Platform.native ? SecureStore.deleteItemAsync : promiseFromTryCatch(localStorage.removeItem.bind(localStorage))
}

/**
 * Get stored value by key
 *
 * @param key property to retrieve
 * @returns Task(value)
 */
export const getItem = pipe(
  storageEngine.getItem,
  Task.fromPromise,
  map(String),
  map(JSON.parse)
)

/**
 * Set storage value by key
 *
 * @Remarks curried
 * @param key property to set
 * @param value value to serialize and write to storage
 * @returns Task(value)
 */
export const setItem = curry((key, value) =>
  pipe(
    JSON.stringify,
    storageEngine.setItem(key),
    Task.fromPromise
  )(value)
)

/**
 * Delete storage value by key
 *
 * @param key storage property to remove
 * @returns Task(null)
 */
export const removeItem = pipe(
  storageEngine.removeItem,
  Task.fromPromise
)

export default storageEngine
