import React, { Component } from 'react'

import SessionController from '../SessionController'

import { recognition } from '../../Web-Speech-API-config'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      sessionStarted: false,
      isTimed: false
    }
    this.toggleSession = this.toggleSession.bind(this)
    this.endSession = this.endSession.bind(this)
  }

  toggleSession(timerBool) {
    const { sessionStarted } = this.state
    this.setState({ sessionStarted: !sessionStarted, isTimed: timerBool })
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
    const { sessionStarted, isTimed } = this.state
    const { toggleSession } = this
    console.log(sessionStarted)
    return (
      <div>
        {sessionStarted ? (
          <div>
            <SessionController
              sessionStarted={sessionStarted}
              toggleSession={toggleSession}
              isTimed={isTimed}
            />
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => this.toggleSession(false)}>
              Practice
            </button>
            <button type="button" onClick={() => this.toggleSession(true)}>
              Challenge!
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Home
