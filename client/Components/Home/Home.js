import React, { Component } from 'react'

import SessionController from '../SessionController'

import { recognition } from '../../Web-Speech-API-config'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      sessionStarted: false
    }
    this.toggleSession = this.toggleSession.bind(this)
    this.endSession = this.endSession.bind(this)
  }

  toggleSession() {
    const { sessionStarted } = this.state
    this.setState({ sessionStarted: !sessionStarted })
    if (sessionStarted) {
      this.endSession()
    }
  }

  endSession() {
    recognition.onend = () => {
      console.log('Stopped listening!')
    }
    recognition.stop()
  }

  render() {
    const { sessionStarted } = this.state
    const { toggleSession } = this
    console.log(sessionStarted)
    return (
      <div>
        {sessionStarted ? (
          <div>
            <SessionController
              sessionStarted={sessionStarted}
              toggleSession={toggleSession}
            />
          </div>
        ) : (
          <button type='button' onClick={() => this.toggleSession()}>
            Start!
          </button>
        )}
      </div>
    )
  }
}

export default Home
