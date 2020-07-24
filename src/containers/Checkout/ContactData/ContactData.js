import React, { useState } from 'react';
// import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index'

import {updateObject, checkValidity} from '../../../shared/utility';


export const ContactData = (props) => {

  const [orderForm, setOrderForm] = useState({// #region
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      validation: {},
      value: 'fastest', //to be fixed later
      valid: true,
    }})
  // //#endregion
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: props.ingredientREDUX,
      price: props.priceREDUX,
      orderData: formData,
      userId: props.userIdREDUX
    };

    props.onOrderBurger(order, props.tokenREDUX);

  };

  const inputChangeHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value,orderForm[inputIdentifier].validation),
    })

    const updatedOrderForm = updateObject(orderForm,{
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid) 
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            valueType={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) =>
              inputChangeHandler(event, formElement.id)
            }
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        Complete Order
      </Button>
    </form>
  );
  if (props.loadingREDUX) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Information</h4>
      {form}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    ingredientREDUX: state.burgerBuilder.ingredients,
    priceREDUX: state.burgerBuilder.totalPrice,
    loadingREDUX: state.order.loading,
    tokenREDUX: state.auth.token,
    userIdREDUX: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
