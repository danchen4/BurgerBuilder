import React from 'react';
import classes from './CheckOutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
  <div className={classes.CheckOutSummary}>
    <h1>We hope it tastes good!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <h3>Continue to order information (from CheckoutSummary)?</h3>
    <Button clicked={props.checkoutCancelled} btnType="Danger">
      CANCEL
    </Button>
    <Button clicked={props.checkoutContinued} btnType="Success">
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
