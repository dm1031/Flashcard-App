import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Home, Nav, Login } from '../../Components'

import { checkIfUserLoggedInThunk } from '../../store/user/action'

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()
  }

  render() {
    const { user } = this.props
    return (
      <Fragment>
        <Router>
          <Route exact path="/" component={user ? Home : Login} />
        </Router>
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
