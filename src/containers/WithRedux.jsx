import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import PropTypes from 'prop-types'

import authReducer, { saga as authSaga } from '../ducks/auth'

const sagas = [
  authSaga()
]

const reducers = {
  auth: authReducer
}

const sagaMiddleware = createSagaMiddleware()

// build saga middleware
function * rootSaga () {
  yield all(sagas)
}

const buildMiddleware = (includeLogger) => {
  // apply default middleware
  const middleware = [
    ...getDefaultMiddleware(),
    sagaMiddleware
  ]
  // include logger if enabled
  return includeLogger
    ? middleware.concat(logger)
    : middleware
}

export const store = configureStore({
  reducer: reducers,
  middleware: buildMiddleware(process.env.NODE_ENV !== 'production')
})

sagaMiddleware.run(rootSaga)

const ReduxStore = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

ReduxStore.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default ReduxStore
