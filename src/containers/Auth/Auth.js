import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';



export const Auth = (props) => {
  const {burgerBuildingREDUX, authRedirectPathREDUX, onSetAuthRedirectPath} = props;

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
    },
  })
  
  const [isSignup, setIsSignup] = useState(true)

  useEffect(()=>{
    if (!burgerBuildingREDUX && authRedirectPathREDUX !== '/') {
      onSetAuthRedirectPath();  //Set to '/' below
    }
  },[burgerBuildingREDUX, authRedirectPathREDUX, onSetAuthRedirectPath])

  const inputChangeHandler = (event, controlName) => {
    const updatedControl = updateObject(controls[controlName], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, controls[controlName].validation),
    })

    const updatedControls = updateObject(controls,{
      [controlName]: updatedControl
    });

    setControls(updatedControls);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  }

  const swithAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map(formElement => (
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
    )
  )

  if (props.loadingREDUX) {
    form = <Spinner />
  }
        
  let errorMessage = null;
  if (props.errorREDUX) {
    errorMessage = (
      <p style={{color: 'salmon', fontWeight: 'bold', border: '1px solid red'}}>
        {props.errorREDUX.message}
      </p>
    )
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPathREDUX} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {isSignup ? <h2>SIGN UP</h2> : <h2>SIGN IN</h2>}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button 
        btnType="Danger"
        clicked={swithAuthModeHandler}
        >SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loadingREDUX: state.auth.loading,
    errorREDUX: state.auth.error,
    isAuthenticated: state.auth.token,
    burgerBuildingREDUX: state.burgerBuilder.building,
    authRedirectPathREDUX: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath: () => {dispatch(actions.setAuthRedirectPath('/'))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

