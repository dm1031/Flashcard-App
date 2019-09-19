import React, { Component } from 'react'

import { connect } from 'react-redux'

import { updateSessionWithFactorsThunk } from '../../store/session/action'

const rootFactors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const mapStateToProps = ({ session }) => {
  return {
    session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSessionWithFactors: (sessionId, factors) =>
      dispatch(updateSessionWithFactorsThunk(sessionId, factors))
  }
}

class Menu extends Component {
  constructor() {
    super()
    this.state = {
      factors: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(factor) {
    const { factors } = this.state
    const addFactor = [...factors, factor]
    this.setState({ factors: addFactor })
  }

  handleSubmit() {
    const { session, updateSessionWithFactors, handleFlashcard } = this.props
    const { factors } = this.state
    updateSessionWithFactors(session.id, { factors }).then(() =>
      handleFlashcard()
    )
  }

  render() {
    const { handleClick, handleSubmit } = this
    return (
      <div>
        {rootFactors.map(rootFactor => (
          <button
            key={rootFactor}
            type="button"
            onClick={() => handleClick(rootFactor)}
          >
            {rootFactor}
          </button>
        ))}
        <button type="button" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

// handleSubmit makes an api call to put route that updates the session to have
