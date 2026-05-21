import {Component} from 'react'

import CartContext from '../context/CartContext'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onIncrement = () => {
    this.setState(prev => ({
      quantity: prev.quantity + 1,
    }))
  }

  onDecrement = () => {
    this.setState(prev => {
      if (prev.quantity > 0) {
        return {
          quantity: prev.quantity - 1,
        }
      }

      return null
    })
  }

  render() {
    const {dish} = this.props

    const {quantity} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onAddToCart = () => {
            addCartItem({
              ...dish,
              quantity,
            })
          }

          return (
            <div className="dish-card">
              <div className="dish-info">
                <h1 className="dish-name">{dish.dish_name}</h1>

                <p className="dish-price">
                  {`${dish.dish_currency} ${dish.dish_price}`}
                </p>

                <p className="dish-description">{dish.dish_description}</p>

                <p>{`${dish.dish_calories} calories`}</p>

                {dish.dish_Availability ? (
                  <>
                    <div className="counter">
                      <button type="button" onClick={this.onDecrement}>
                        -
                      </button>

                      <p>{quantity}</p>

                      <button type="button" onClick={this.onIncrement}>
                        +
                      </button>
                    </div>

                    {quantity > 0 && (
                      <button
                        type="button"
                        className="add-cart-btn"
                        onClick={onAddToCart}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </>
                ) : (
                  <p className="not-available">Not available</p>
                )}

                {dish.addonCat.length > 0 && (
                  <p className="addon">Customizations available</p>
                )}
              </div>

              <img src={dish.dish_image} alt={dish.dish_name} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
