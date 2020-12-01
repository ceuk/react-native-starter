import { createSlice } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { loginRequest, validateTokenRequest } from '../api/methods/auth'
import { Either, setItem, removeItem } from '@versita/fp-lib'

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
    }

  }
})

// Sagas

function * onLoginAttempt ({ payload }) {
  const res = yield call(loginRequest, payload)
  yield put(Either.fold(
    ({ error }) => actions.LOGIN_FAILED(String(error)),
    ({ value }) => actions.LOGIN_SUCCESS(value),
    res
  ))
}

function * onLoginSuccess ({ payload }) {
  yield call(setItem, 'currentUser', payload.value)
}

function * onLoginFailed () {
  // show a message saying login failed
}

function * onLoginRestored () {
  const res = yield call(validateTokenRequest)
  if (res.isLeft) {
    yield put(actions.LOGOUT_SUCCESS())
  }
}

function * onLogout () {
  yield call(removeItem, 'currentUser')
}

export function * saga () {
  yield takeLatest(actions.LOGIN_ATTEMPT, onLoginAttempt)
  yield takeLatest(actions.LOGIN_SUCCESS, onLoginSuccess)
  yield takeLatest(actions.LOGIN_RESTORED, onLoginRestored)
  yield takeLatest(actions.LOGOUT_SUCCESS, onLogout)
  yield takeLatest(actions.LOGIN_FAILED, onLoginFailed)
}

export const {
  LOGIN_ATTEMPT,
  LOGIN_RESTORED,
  LOGOUT_SUCCESS
} = actions

export default reducer
