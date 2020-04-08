import React from 'react';
import { withRouter} from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {flattenDeep} from 'lodash';

const burger = (props) => {

  // console.log(props)

  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map((igKey) => {
  //     return [...Array(props.ingredients[igKey])].map((_,index) => { //Creates Array of Arrays
  //         return <BurgerIngredient key={igKey + index} type={igKey}/>
  //     });
  //   })
  //   .reduce((prevElementArray, currentElementArray)=>{ //Flattens array
  //     return prevElementArray.concat(currentElementArray);
  //   },[]);

  let transformedIngredients = flattenDeep(Object.keys(props.ingredients)
  .map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_,index) => { //Creates Array of Arrays
        return <BurgerIngredient key={igKey + index} type={igKey}/>
    });
  }));

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Please start adding ingredients!</p>
  }
  

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type ="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type = "bread-bottom"/>
      
    </div>
  );
}

export default withRouter(burger);