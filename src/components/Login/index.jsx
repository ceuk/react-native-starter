import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { LOGIN_ATTEMPT } from '../../ducks/auth'
import Button from '../Button'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, loggedIn, loggingIn }) => {
  const login = () => handleLogin({ email: 'ceuk.dev@gmail.com', password: 'abcd1234' })
  return (
    <View>
      {loggedIn ? <Text>LOGGED IN</Text> : <Button onPress={login} text="Click Me"/>}
    </View>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser,
    loggingIn: state.auth.loggingIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: ({ email, password }) => dispatch(LOGIN_ATTEMPT({ email, password }))
  }
}

// eslint-disable-next-line react-redux/prefer-separate-component-file
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
