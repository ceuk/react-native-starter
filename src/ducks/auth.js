import { createSlice } from '@reduxjs/toolkit'
import { loginRequest, validateTokenRequest } from '../api/methods/auth'
import { map, mergeMap } from 'rxjs/operators'
import { Either } from '@versita/fp-lib'
import { setItem, removeItem } from '../localStorage'
import { ofType, combineEpics } from 'redux-observable'

const initialAuthState = {
  currentUser: undefined,
  loggingIn: false,
  sessions: []
}

const { actions, reducer } = createSlice({
  initialState: initialAuthState,
  name: 'auth',
  reducers: {
    LOGIN_ATTEMPT: state => {
      state.loggingIn = true
    },
    LOGIN_FAILED: state => {
      state.currentUser = undefined
      state.loggingIn = false
    },
    LOGIN_RESTORED: (state, { payload }) => {
      state.currentUser = payload.id
      state.loggingIn = false
      state.sessions = state.sessions.includes(payload.id)
        ? state.sessions
        : state.sessions.concat(payload.id)
    },
    LOGIN_SUCCESS: (state, { payload }) => {
      state.currentUser = payload.id
      state.loggingIn = false
      state.sessions = state.sessions.includes(payload.id)
        ? state.sessions
        : state.sessions.concat(payload.id)
    },
    LOGOUT_SUCCESS: (state) => {
      state.currentUser = undefined
      state.loggingIn = false
    },
    LOGOUT_ATTEMPT: () => {},
    SESSION_SAVED: () => {},
    SESSION_VALIDATED: () => {}
  }
})

const onLoginAttempt = action$ => action$.pipe(
  ofType(actions.LOGIN_ATTEMPT),
  mergeMap(({ payload }) =>
    loginRequest(payload)
      .pipe(map(Either.fold(
        ({ error }) => actions.LOGIN_FAILED(String(error)),
        ({ value }) => actions.LOGIN_SUCCESS(value)
      )))
  )
)

const onLoginSuccess = action$ => action$.pipe(
  ofType(actions.LOGIN_SUCCESS),
  map(({ payload }) => {
    setItem('currentUser', payload)
    return actions.SESSION_SAVED
  })
)

const onLoginRestored = action$ => action$.pipe(
  ofType(actions.LOGIN_RESTORED),
  mergeMap(() =>
    validateTokenRequest()
      .pipe(map(Either.fold(
        actions.LOGOUT_ATTEMPT,
        actions.SESSION_VALIDATED
      )))
  )
)

const onLogoutAttempt = action$ => action$.pipe(
  ofType(actions.LOGOUT_ATTEMPT),
  map(({ payload }) => {
    removeItem('currentUser', payload.value)
    return actions.LOGOUT_SUCCESS
  })
)

export const epics = combineEpics(
  onLoginAttempt,
  onLoginSuccess,
  onLoginRestored,
  onLogoutAttempt
)

export const {
  LOGIN_ATTEMPT,
  LOGIN_RESTORED,
  LOGOUT_SUCCESS
} = actions

export default reducer
