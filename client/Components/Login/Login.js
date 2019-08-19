import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserThunk } from '../../store/user/action'

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(loginUserThunk(credentials))
  }
}

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleSubmit() {
    const { email, password } = this.state
    this.props.login({ email, password }).catch(err => this.handleError(err))
  }

  handleError(err) {
    this.setState({ error: err.response.data })
  }

  render() {
    const { email, password, error } = this.state
    return (
      <div>
        {error ? error : ''}
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={ev => this.setState({ email: ev.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={ev => this.setState({ password: ev.target.value })}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
