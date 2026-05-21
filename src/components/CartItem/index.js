import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {item} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onIncrement = () => {
          incrementCartItemQuantity(item.dish_id)
        }

        const onDecrement = () => {
          decrementCartItemQuantity(item.dish_id)
        }

        const onRemove = () => {
          removeCartItem(item.dish_id)
        }

        return (
          <div className="cart-item">
            <div className="cart-left">
              <img
                src={item.dish_image}
                alt={item.dish_name}
                className="cart-image"
              />

              <div>
                <h2>{item.dish_name}</h2>

                <p>Rs {item.dish_price * item.quantity}</p>

                <div className="counter">
                  <button type="button" onClick={onDecrement}>
                    -
                  </button>

                  <p>{item.quantity}</p>

                  <button type="button" onClick={onIncrement}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <button type="button" className="remove-btn" onClick={onRemove}>
              Remove
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
