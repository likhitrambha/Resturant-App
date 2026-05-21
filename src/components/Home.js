import {Component} from 'react'

import Header from './Header'
import Tabs from './Tabs'
import DishItem from './DishItem'
import CartContext from '../context/CartContext'

class Home extends Component {
  state = {
    menuList: [],
    activeTab: '',
    restaurantName: '',
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )

    const data = await response.json()

    const restaurant = data[0]

    this.setState({
      menuList: restaurant.table_menu_list,
      restaurantName: restaurant.restaurant_name,
      activeTab: restaurant.table_menu_list[0].menu_category_id,
    })
  }

  setActiveTab = id => {
    this.setState({activeTab: id})
  }

  render() {
    const {menuList, activeTab, restaurantName} = this.state

    if (menuList.length === 0) {
      return <p>Loading...</p>
    }

    const activeCategory = menuList.find(
      each => each.menu_category_id === activeTab,
    )

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, getDishCount} = value

          return (
            <div className="app">
              <Header name={restaurantName} count={cartList.length} />

              <Tabs
                tabs={menuList}
                activeTab={activeTab}
                setActiveTab={this.setActiveTab}
              />

              <div className="dishes">
                {activeCategory.category_dishes.map(dish => (
                  <DishItem
                    key={dish.dish_id}
                    dish={dish}
                    count={getDishCount(dish.dish_id)}
                  />
                ))}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
