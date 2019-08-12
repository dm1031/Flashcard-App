import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getSingleFlashcardThunk } from '../../store/flashcard/action'

import SolutionBox from '../SolutionBox'

const mapStateToProps = ({ flashcard }) => {
  return {
    flashcard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFlashcard: () => dispatch(getSingleFlashcardThunk())
  }
}

const Flashcard = ({ flashcard, getFlashcard }) => {
  useEffect(() => {
    getFlashcard()
  }, [])

  return (
    <div>
      {flashcard ? flashcard.prompt : ''}
      <SolutionBox getFlashcard={getFlashcard} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flashcard)
