import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Cart from './components/Cart'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        each => each.dish_id === dish.dish_id,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(each => {
            if (each.dish_id === dish.dish_id) {
              return {
                ...each,
                quantity: each.quantity + 1,
              }
            }

            return each
          }),
        }
      }

      return {
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dish_id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.dish_id === id) {
          return {
            ...each,
            quantity: each.quantity + 1,
          }
        }

        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(each => {
          if (each.dish_id === id) {
            return {
              ...each,
              quantity: each.quantity - 1,
            }
          }

          return each
        })
        .filter(each => each.quantity > 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  getDishCount = id => {
    const {cartList} = this.state

    const item = cartList.find(each => each.dish_id === id)

    return item ? item.quantity : 0
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />

            <ProtectedRoute
              exact
              path="/"
              component={() => (
                <Home cartList={cartList} getDishCount={this.getDishCount} />
              )}
            />

            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
