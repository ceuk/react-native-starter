import React from 'react'
import { Redirect, Route, useLocation } from '../../router'
import WithAuthStatus from '../../containers/WithAuthStatus'
import PropTypes from 'prop-types'

const PrivateRoute = ({ loggedIn, ...otherProps }) => {
  const location = useLocation()
  return loggedIn
    ? <Route {...otherProps} />
    : <Redirect to={{
      pathname: '/login',
      state: { from: location }
    }} />
}

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool
}

export default WithAuthStatus(PrivateRoute)
