import registerRootComponent from 'expo/build/launch/registerRootComponent'
import React from 'react'
import App from './App'
// import './styles/global.web.scss'
import WithRedux from './containers/WithRedux'

const RootComponent = () => (
  <React.StrictMode>
    <WithRedux>
      <App />
    </WithRedux>
  </React.StrictMode>
)

registerRootComponent(RootComponent)
