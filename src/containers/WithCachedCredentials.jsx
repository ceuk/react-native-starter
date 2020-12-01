import React from 'react'
import { connect } from 'react-redux'
import { getItem, pipe } from '@versita/fp-lib'
import { LOGIN_RESTORED } from '../ducks/auth'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => {
  return {
    restoreSession: (cachedCredentials) => dispatch(LOGIN_RESTORED(cachedCredentials))
  }
}

const Wrapper = ({ restoreSession, Component }) => {
  const cachedCredentials = getItem('currentUser')
  return <Component restoreSession={() => !cachedCredentials.isLeft && cachedCredentials.$value && cachedCredentials.map(restoreSession)} />
}

Wrapper.propTypes = {
  restoreSession: PropTypes.func,
  Component: PropTypes.func
}

const attachToStore = connect(null, mapDispatchToProps)

const WithCachedCredentials = OuterComponent => Component => function $WithCachedCredentials () {
  return <OuterComponent Component={Component} />
}

export default pipe(
  attachToStore,
  WithCachedCredentials
)(Wrapper)
