import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flashcard from '../Flashcard'
import Timer from '../Timer'

import { createSessionThunk } from '../../store/session/action'
import { getSingleFlashcardThunk } from '../../store/flashcard/action'

const mapStateToProps = ({ session, sessionCard }) => {
  return {
    session,
    sessionCard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSession: () => dispatch(createSessionThunk()),
    getFlashcard: result => dispatch(getSingleFlashcardThunk(result))
  }
}
class Home extends Component {
  constructor() {
    super()
    this.state = {
      sessionStarted: false,
      flashcardType: 'all'
    }
    this.toggleSession = this.toggleSession.bind(this)
  }

  toggleSession() {
    const { sessionStarted } = this.state
    this.setState({ sessionStarted: !sessionStarted })
    if (this.props.session.timeStarted && !sessionStarted) {
      this.setState({ flashcardType: 'incorrect' })
    } else if (!this.props.session.timeStarted) {
      this.props.createSession()
    }
  }

  render() {
    const { sessionStarted, flashcardType } = this.state
    const { session } = this.props
    const { toggleSession } = this
    return (
      <div>
        {sessionStarted && session.timeStarted ? (
          <div>
            <Timer toggleSession={toggleSession} />
            <Flashcard flashcardType={flashcardType} />
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
)(Home)
