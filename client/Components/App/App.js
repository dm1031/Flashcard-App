import React, { Component } from 'react'
import Flashcard from '../Flashcard'
import { connect } from 'react-redux'
import { getFlashcardsThunk } from '../../store/flashcards/action'

const mapStateToProps = ({ flashcards }) => {
  return {
    flashcards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFlashcards: () => dispatch(getFlashcardsThunk())
  }
}
class App extends Component {
  componentDidMount() {
    this.props.getFlashcards()
  }
  render() {
    return <div>{this.props.flashcards.length ? <Flashcard /> : ''}</div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
