import React, { useState, useEffect, useCallback } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';


export const BurgerBuilder = (props) => {
  const [ purchasing, setPurchasing ] = useState(false)


  const dispatch = useDispatch();

  const ingredientREDUX = useSelector(state=> state.burgerBuilder.ingredients);
  const priceREDUX = useSelector(state=> state.burgerBuilder.totalPrice);
  const errorRedux = useSelector(state=> state.burgerBuilder.error);
  const isAuthenticated = useSelector(state=> state.auth.token);

  const onAddIngredient = (ingredient) => dispatch(actions.addIngredient(ingredient));
  const onRemoveIngredient = (ingredient) => dispatch(actions.removeIngredient(ingredient));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => {dispatch(actions.setAuthRedirectPath(path))};

  useEffect(()=>{
    onInitIngredients();
  },[onInitIngredients])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, item) => {
        return sum + item;
      }, 0);
    // setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  const purchasedHandler = () => {
    if(isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchasedContinueHandler = () => {
    onInitPurchase(); 

    props.history.push({
      pathname: '/checkout',
    });
  };

  const disabledInfo = { ...ingredientREDUX };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = errorRedux ? (
    <p> Ingredients could not be loaded </p>
  ) : (
    <Spinner />
  );

  if (ingredientREDUX) {
    burger = (
      <Auxiliary>
        <Burger ingredients={ingredientREDUX} />
        <BuildControls
          price={priceREDUX}
          ingredientAdded={onAddIngredient}
          ingredientremoved={onRemoveIngredient}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ingredientREDUX)}
          ordered={purchasedHandler}
          ingredients={ingredientREDUX}
          isAuth={isAuthenticated}
        />
      </Auxiliary>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredientREDUX}
        price={priceREDUX}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchasedContinueHandler}
      />
    );
  }

  return (
    <Auxiliary>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
}

export default withErrorHandler(BurgerBuilder, axios);



