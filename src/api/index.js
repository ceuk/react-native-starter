/* global process */
import axios from 'axios'
import { chain, map, pipe, TaskEither, Task } from '@versita/fp-lib'
import { pluck } from 'ramda'
import { from as convertToObservable } from 'rxjs'
import { getItem } from '../localStorage'

// API Config
const baseURLs = {
  development: 'http://localhost:3005',
  production: '',
  test: ''
}
const baseURL = baseURLs[process.env.NODE_ENV] || baseURLs.development

/** createRequest :: parameters -> client -> Task(AxiosClient) */
const createRequest = parameters => client => Task.fromPromise(client(parameters))

/** makeAuthenticatedRequest :: parameters -> RxJsObservable(Either) */
export const makeAuthenticatedRequest = parameters => pipe(
  getItem,
  pluck('token'),
  map(token => axios.create({
    baseURL,
    headers: {
      common: {
        Authorization: `Bearer ${token}`
      }
    }
  })),
  chain(createRequest(parameters)),
  pluck('data'),
  TaskEither.fromTask,
  TaskEither.runIfValid,
  convertToObservable
)('currentUser')

/** makeUnauthenticatedRequest :: parameters -> RxJsObservable(Either) */
export const makeUnauthenticatedRequest = (parameters) => pipe(
  createRequest(parameters),
  pluck('data'),
  TaskEither.fromTask,
  TaskEither.runIfValid,
  convertToObservable
)(axios.create({ baseURL }))
