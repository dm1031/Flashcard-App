import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flashcard from '../Flashcard'
import Timer from '../Timer'
import SpeechRecognizer from '../SpeechRecognizer'

import { createSessionThunk } from '../../store/session/action'
import { getSingleFlashcardThunk } from '../../store/flashcard/action'

import Menu from '../Menu'

const mapStateToProps = ({ session, flashcard }) => {
  return {
    session,
    flashcard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSession: isTimed => dispatch(createSessionThunk(isTimed)),
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
    const { session, createSession, isTimed } = this.props
    if (session.id) {
      this.setState({ flashcardType: 'incorrect' })
    } else if (!session.id) {
      createSession(isTimed).then(() => {
        console.log('session created!')
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
    const { toggleSession, session, flashcard, isTimed } = this.props
    const { flashcardType } = this.state
    const { handleFlashcard } = this
    return (
      <div>
        {session.id && session.factors ? (
          <div>
            <Timer toggleSession={toggleSession} isTimed={isTimed} />
            <Flashcard flashcard={flashcard} />
            <SpeechRecognizer
              flashcardType={flashcardType}
              handleFlashcard={handleFlashcard}
            />
          </div>
        ) : (
          <Menu handleFlashcard={handleFlashcard} />
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionController)
