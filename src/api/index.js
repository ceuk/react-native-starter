/* global process */
import axios from 'axios'
import { chain, curry, identity, map, pipe, getItem, TaskEither, Either } from '@versita/fp-lib'
import { pluck } from 'ramda'

// API Config
const baseURLs = {
  development: 'http://localhost:3005',
  production: '',
  test: ''
}

/**
 * retrieves the currentUser field from localStorage, converts from Either -> TaskEither
 * and maps to the 'token' field
 *
 * @returns Either-wrapped token string
 */
const getToken = () => {
  return pipe(
    getItem,
    pluck('token')
  )('currentUser')
}

/**
 * Creats an axios client with the appriopriate base URL and Auth header
 *
 * @param maybeToken Either-wrapped token string
 * @returns axios client wrapped in Either
 */
const getAuthenticatedClient = (maybeToken) => {
  // TODO - make this pure
  const baseURL = baseURLs[process.env.NODE_ENV] || baseURLs.development
  return pipe(
    map((token) => axios.create({
      baseURL,
      headers: {
        common: {
          Authorization: `Bearer ${token}`
        }
      }
    })))(maybeToken)
}

/**
 * Creats an axios client with the appriopriate base URL
 *
 * @returns axios client wrapped in Either
 */
const getUnauthenticatedClient = () => {
  const baseURL = baseURLs[process.env.NODE_ENV] || baseURLs.development
  return Either.of(axios.create({ baseURL }))
}

/**
 * Applies the supplied axios params to the supplied axios client and
 * wraps the ready-to-call request in a TaskEither
 *
 * @Remarks curried
 * @param params axios request params
 * @param client axios client instance
 * @returns TaskEither containing the request to be executed
 */
const createRequest = curry((parameters, client) => {
  const requestTask = TaskEither.tryCatch(
    () => client(parameters),
    identity
  )
  return pipe(
    pluck('data')
  )(requestTask)
})

/**
 * Makes an authenticated http request using the supplied axios params
 *
 * @param params axios request params
 * @returns A promisified http call that resolves to an either
 */
export const makeAuthenticatedRequest = (parameters) => {
  const request = pipe(
    getToken,
    getAuthenticatedClient,
    chain(createRequest(parameters))
  )()
  return TaskEither.runIfValid(request)
}

/**
 * Makes a http request using the supplied axios params
 *
 * @param params axios request params
 * @returns A promisified http call that resolves to an either
 */
export const makeUnauthenticatedRequest = (parameters) => {
  const request = pipe(
    getUnauthenticatedClient,
    chain(createRequest(parameters))
  )()
  return TaskEither.runIfValid(request)
}
