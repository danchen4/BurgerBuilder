import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
// import queryString from 'query-string';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';



export const Checkout = (props) => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };


  let summary = <Redirect to="/"/>
  if (props.ingredientREDUX) {
    const purchasedRedirect = props.purchasedREDUX ? <Redirect to="/"/> : null;
    summary= (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            ingredients={props.ingredientREDUX}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={props.match.url + '/contact-data'}
            component={ContactData}
            // render={(props) => (
            //   <ContactData
            //     ingredients={props.ingredientREDUX}
            //     price={props.priceREDUX}
            //     {...props}
            //   />
            // )}
          />
      </div>
    );
  }

  return (
    <div>
      {summary}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    ingredientREDUX: state.burgerBuilder.ingredients,
    purchasedREDUX: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
