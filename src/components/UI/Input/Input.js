import React from 'react';
import classes from './Input.css';

const input = React.memo((props) => {
  let inputElement = null;
  const inputClasses=[classes.InputElement]
  let validationError = null;

  console.log('<input> RENDER')

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ErrorMessage}> Please enter a valid {props.valueType}</p>;
  }

  switch (props.elementType) {
    case ('input'):
      inputElement= <input 
        className={inputClasses.join(' ')}
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('select'):
        inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
            {props.elementConfig.options.map(option=>{
              return <option 
                key={option.value}
                value={option.value}>
                {option.displayValue}
              </option>
            })}
          </select>);
        break;  
    default:
      inputElement= <input
        className={inputClasses.join(' ')}
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>;
      break;
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}></label>
      {validationError}
      {inputElement}
    </div>
  );
});

export default input;