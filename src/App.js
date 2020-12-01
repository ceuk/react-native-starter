import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Router, Route, Switch } from './router'
import WithCachedCredentials from './containers/WithCachedCredentials'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import PropTypes from 'prop-types'

const App = ({ restoreSession }) => {
  useEffect(() => {
    restoreSession()
  }, [restoreSession])
  return (
    <View style={tempStyles.container}>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={() => <Text>Home Page</Text>} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
      <StatusBar style="auto" />
    </View>
  )
}

App.propTypes = {
  restoreSession: PropTypes.func
}

const tempStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})

export default WithCachedCredentials(App)
