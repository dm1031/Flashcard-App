import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flashcard from '../Flashcard'

import { createSessionThunk } from '../../store/session/action'

const mapDispatchToProps = dispatch => {
  return {
    createSession: () => dispatch(createSessionThunk())
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      sessionStarted: false
    }
  }

  toggleSession() {
    this.setState({ sessionStarted: true })
    this.props.createSession()
  }

  render() {
    const { sessionStarted } = this.state
    return (
      <div>
        {sessionStarted ? (
          <Flashcard />
        ) : (
          <button type="button" onClick={() => this.toggleSession()}>
            Start!
          </button>
        )}
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
