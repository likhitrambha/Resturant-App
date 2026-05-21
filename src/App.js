import {Component} from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import DishItem from './components/DishItem'
import './App.css'

class App extends Component {
  state = {
    menuList: [],
    activeTab: '',
    cartItems: {},
    cartCount: 0,
    restaurantName: '',
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = async () => {
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      const restaurant = data[0]

      this.setState({
        menuList: restaurant.table_menu_list,
        restaurantName: restaurant.restaurant_name,
        activeTab: restaurant.table_menu_list?.[0]?.menu_category_id || '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  setActiveTab = id => {
    this.setState({activeTab: id})
  }

  updateCount = (id, value) => {
    this.setState(prev => {
      const {cartItems} = prev
      const current = cartItems[id] || 0

      if (value === -1 && current === 0) {
        return null
      }

      const updated = current + value
      const updatedCart = {...cartItems}

      if (updated === 0) {
        delete updatedCart[id]
      } else {
        updatedCart[id] = updated
      }

      const totalCount = Object.values(updatedCart).reduce(
        (acc, item) => acc + item,
        0,
      )

      return {
        cartItems: updatedCart,
        cartCount: totalCount,
      }
    })
  }

  getDishCount = id => {
    const {cartItems} = this.state
    return cartItems[id] || 0
  }

  render() {
    const {menuList, activeTab, cartCount, restaurantName} = this.state

    if (menuList.length === 0) {
      return <p>Loading...</p>
    }

    const activeCategory = menuList.find(
      item => item.menu_category_id === activeTab,
    )

    return (
      <div className="app">
        <Header name={restaurantName} count={cartCount} />

        <Tabs
          tabs={menuList}
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
        />

        <div className="dishes">
          {activeCategory?.category_dishes?.map(dish => (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              count={this.getDishCount(dish.dish_id)}
              updateCount={this.updateCount}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
