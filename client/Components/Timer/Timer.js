import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isTimeRemaining } from '../../Utilities'

const mapStateToProps = ({ session }) => {
  return {
    session
  }
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: this.props.session.timeNeeded
    }
    this.tick = this.tick.bind(this)
  }
  tick() {
    const { remainingTime } = this.state
    const { timeStarted, timeNeeded } = this.props.session
    if (isTimeRemaining(timeStarted, timeNeeded)) {
      this.setState({ remainingTime: remainingTime - 1 })
    }
  }
  componentDidUpdate() {
    if (this.state.remainingTime > 0) {
      setTimeout(() => {
        this.tick()
      }, 1000)
    }
  }
  componentDidMount() {
    this.tick()
  }
  render() {
    return <div>{this.state.remainingTime}</div>
  }
}

export default connect(mapStateToProps)(Timer)
