import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {name, count, history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <Link to="/" className="logo">
        <h1>{name}</h1>
      </Link>

      <div className="header-right">
        <p>My Orders</p>

        <Link to="/cart">
          <button type="button" data-testid="cart" className="cart-btn">
            🛒
            <span className="cart-count">{count}</span>
          </button>
        </Link>

        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
