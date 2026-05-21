import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const cartCount = cartList.length

      return (
        <>
          <Header name="UNI Resto Cafe" count={cartCount} />

          <div className="cart-container">
            {cartList.length === 0 ? (
              <div className="empty-cart">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="empty cart"
                />

                <h1>Your Cart is Empty</h1>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>

                {cartList.map(each => (
                  <CartItem key={each.dish_id} item={each} />
                ))}
              </>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
