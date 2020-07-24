import React from 'react';
import classes from './Order.css'




const order = (props) => {

  const ingredients=[];
  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        count: props.ingredients[ingredientName]
      }
    )
  }

  const ingredientOutput = ingredients.map(ig=>{
    return <span className={classes.ingredient} key={ig.name}>{ig.name} ({ig.count}) </span>
  })

  return (
    <div className={classes.Order}>
      <h4>Order ID:{props.orderId.split('').splice(1).join('')}</h4>
      <p className={classes.ingredients}>Ingredients: {ingredientOutput}</p>
      <p>Delivery Method: {props.deliveryMethod}</p>
      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
