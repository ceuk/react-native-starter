import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser
  }
}

export default connect(mapStateToProps)
