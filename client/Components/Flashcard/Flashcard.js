import React, { Component } from 'react'
// import { connect } from 'react-redux'

// import { getSingleFlashcardThunk } from '../../store/flashcard/action'

// const mapStateToProps = ({ flashcard }) => {
//   return {
//     flashcard
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getFlashcard: flashcardType =>
//       dispatch(getSingleFlashcardThunk(flashcardType))
//   }
// }

// class Flashcard extends Component {
//   componentDidMount() {
//     const { getFlashcard, flashcardType } = this.props
//     getFlashcard(flashcardType)
//   }
//   render() {
//     console.log('rendering flashcard')
//     const { flashcard } = this.props
//     return <div>{flashcard.id ? flashcard.prompt : ''}</div>
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Flashcard)

const Flashcard = ({ flashcard }) => {
  return <div>{flashcard.prompt}</div>
}

export default Flashcard
