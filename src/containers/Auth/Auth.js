import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  }

  componentDidMount() {
    if (!this.props.burgerBuildingREDUX && this.props.authRedirectPathREDUX !== '/') {
      this.props.onSetAuthRedirectPath();  //Set to '/' below
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }
    this.setState({controls:updatedControls});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  swithAuthModeHandler = () => {
    this.setState(prevState=>{
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
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
            this.inputChangeHandler(event, formElement.id)
          }
        />
      )
    )

    if (this.props.loadingREDUX) {
      form = <Spinner />
    }
          
    let errorMessage = null;
    if (this.props.errorREDUX) {
      errorMessage = (
        <p style={{color: 'salmon', fontWeight: 'bold', border: '1px solid red'}}>
          {this.props.errorREDUX.message}
        </p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPathREDUX} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {this.state.isSignup ? <h2>SIGN UP</h2> : <h2>SIGN IN</h2>}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
          btnType="Danger"
          clicked={this.swithAuthModeHandler}
          >SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    )
  }
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

