import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {
  // constructor(props) { //ES6 way
  //   super(props);
  //   this.state = {...this}
  // }

  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, item) => {
        return sum + item;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  // Component Handlers
  // #region
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const ingredientPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + ingredientPrice;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const ingredientPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - ingredientPrice;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // #endregion

  purchasedHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    // alert ('You Continue');

    // Query Params
    // #region
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // #endregion
    this.props.onInitPurchase(); 

    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredientREDUX };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.errorRedux ? (
      <p> Ingredients could not be loaded </p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredientREDUX) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredientREDUX} />
          <BuildControls
            price={this.props.priceREDUX}
            ingredientAdded={this.props.onAddIngredient}
            ingredientremoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredientREDUX)}
            ordered={this.purchasedHandler}
            ingredients={this.props.ingredientREDUX}
            isAuth={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredientREDUX}
          price={this.props.priceREDUX}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchasedContinueHandler}
        />
      );
    }

    // Not required because no asynchronous
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientREDUX: state.burgerBuilder.ingredients,
    priceREDUX: state.burgerBuilder.totalPrice,
    errorRedux: state.burgerBuilder.error,
    isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
