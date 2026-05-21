const Header = ({name, count}) => (
  <div className="header">
    <h2>{name}</h2>
    <p>My Orders</p>

    <div className="cart">
      <span role="img" aria-label="cart">
        🛒
      </span>
      <p>{count}</p>
    </div>
  </div>
)

export default Header
