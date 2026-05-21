import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  componentDidMount() {
    const {history} = this.props

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <h1>Login</h1>

          <label htmlFor="username">USERNAME</label>

          <input
            id="username"
            type="text"
            className="login-input"
            value={username}
            onChange={e =>
              this.setState({
                username: e.target.value,
              })
            }
          />

          <label htmlFor="password">PASSWORD</label>

          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={e =>
              this.setState({
                password: e.target.value,
              })
            }
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
