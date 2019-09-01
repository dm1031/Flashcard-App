import React, { Component } from 'react'

import { recognition } from '../../Web-Speech-API-config'
import SolutionBox from '../SolutionBox'

class SpeechRecognizer extends Component {
  constructor() {
    super()
    this.state = {
      listening: false,
      solution: ''
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.startListen = this.startListen.bind(this)
  }

  startListen() {
    const { listening } = this.state
    if (listening) {
      recognition.start()

      recognition.onresult = event => {
        const speechFromUser = event.results[0][0].transcript
        this.setState({ solution: speechFromUser })
      }

      // if speech recognition pauses while listening is toggled, force it to continue. Staying defensive!
      recognition.onend = () => {
        recognition.start()
      }
    }
  }

  toggleListen() {
    const { listening } = this.state
    this.setState({ listening: !listening }, this.startListen)
  }

  componentDidMount() {
    this.toggleListen()
  }

  render() {
    const { solution } = this.state
    const { flashcardType, handleFlashcard } = this.props
    return (
      <div>
        <SolutionBox
          solution={solution}
          flashcardType={flashcardType}
          handleFlashcard={handleFlashcard}
        />
      </div>
    )
  }
}

export default SpeechRecognizer
