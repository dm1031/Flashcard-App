import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flashcard from '../Flashcard'
import Timer from '../Timer'
import SpeechRecognizer from '../SpeechRecognizer'

import { createSessionThunk } from '../../store/session/action'
import { getSingleFlashcardThunk } from '../../store/flashcard/action'

const mapStateToProps = ({ session, flashcard }) => {
  return {
    session,
    flashcard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSession: () => dispatch(createSessionThunk()),
    getFlashcard: flashcardType =>
      dispatch(getSingleFlashcardThunk(flashcardType))
  }
}

class SessionController extends Component {
  constructor() {
    super()
    this.state = {
      flashcardType: 'all'
    }
    this.handleFlashcard = this.handleFlashcard.bind(this)
  }

  componentDidMount() {
    const { session, createSession } = this.props
    if (session.id) {
      this.setState({ flashcardType: 'incorrect' })
    } else if (!session.id) {
      createSession().then(() => {
        console.log('session created!')
        this.handleFlashcard()
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { flashcardType } = prevState
    if (flashcardType !== this.state.flashcardType) {
      this.handleFlashcard()
    }
  }

  handleFlashcard() {
    const { getFlashcard } = this.props
    const { flashcardType } = this.state
    getFlashcard(flashcardType)
  }

  render() {
    const { toggleSession, session, flashcard } = this.props
    const { flashcardType } = this.state
    const { handleFlashcard } = this
    return (
      <div>
        {session.id ? (
          <div>
            <Timer toggleSession={toggleSession} />
            <Flashcard flashcard={flashcard} />
            <SpeechRecognizer
              flashcardType={flashcardType}
              handleFlashcard={handleFlashcard}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionController)
