// A referenece to both interfaces points to either Firefox or Chrome's Web Speech API interface

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition
window.SpeechGrammarList =
  window.webkitSpeechGrammarList || window.SpeechGrammarList

// Create an instance of each constructor

const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

const grammar = '#JSGF V1.0'

// Config
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1

export { recognition, speechRecognitionList }
