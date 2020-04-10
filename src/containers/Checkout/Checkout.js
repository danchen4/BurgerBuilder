import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
// import queryString from 'query-string';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
  // Query Params
  // #region
  // componentWillMount() {
  //   // const query = queryString.parse(this.props.location.search);
  //   // for (let key in query) {
  //   //   query[key] = +query[key]; //convert object values to number
  //   // }

  //   // console.log(query);

  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     //['salad', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }

  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }
  //#endregion

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <CheckOutSummary
          ingredients={this.props.ingredientREDUX}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ingredientREDUX}
          //     price={this.props.priceREDUX}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientREDUX: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
