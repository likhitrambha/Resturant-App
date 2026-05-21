const DishItem = ({dish, count, updateCount}) => (
  <div className="dish-card">
    <div className="dish-info">
      <div className="dish-header">
        <span className={dish.dish_Type === 1 ? 'veg' : 'nonveg'} />
        <h3>{dish.dish_name}</h3>
      </div>

      <p className="desc">{dish.dish_description}</p>

      <p className="price">
        {dish.dish_currency} {dish.dish_price}
      </p>

      <p className="cal">{dish.dish_calories} calories</p>

      {dish.addonCat?.length > 0 && (
        <p className="addon">Customizations available</p>
      )}

      {dish.dish_Availability ? (
        <div className="counter">
          <button type="button" onClick={() => updateCount(dish.dish_id, -1)}>
            -
          </button>

          <p>{count}</p>

          <button type="button" onClick={() => updateCount(dish.dish_id, 1)}>
            +
          </button>
        </div>
      ) : (
        <p className="not-available">Not available</p>
      )}
    </div>

    <img src={dish.dish_image} alt={dish.dish_name} />
  </div>
)

export default DishItem
