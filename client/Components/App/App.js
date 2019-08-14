import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flashcard from '../Flashcard'
import Timer from '../Timer'

import { createSessionThunk } from '../../store/session/action'

const mapStateToProps = ({ session }) => {
  return {
    session
  }
}

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
    const { session } = this.props
    return (
      <div>
        {sessionStarted && session.timeStarted ? (
          <div>
            <Timer />
            <Flashcard />
          </div>
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
  mapStateToProps,
  mapDispatchToProps
)(App)
