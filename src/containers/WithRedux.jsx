import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import logger from 'redux-logger'
import PropTypes from 'prop-types'

import authReducer, { epics as authEpic } from '../ducks/auth'

const reducers = {
  auth: authReducer
}

const rootEpic = combineEpics(
  authEpic
)

const epicMiddleware = createEpicMiddleware()

const buildMiddleware = (includeLogger) => {
  // apply default middleware
  const middleware = [
    ...getDefaultMiddleware(),
    epicMiddleware
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

epicMiddleware.run(rootEpic)

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
