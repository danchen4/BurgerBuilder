import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem path="/burger" exact clicked={props.clicked}>Burger Builder</NavigationItem>
    {props.isAuth ? 
      <NavigationItem path="/orders" exact clicked={props.clicked}>Orders</NavigationItem>
      : null}
    {!props.isAuth ? 
      <NavigationItem path="/auth" exact clicked={props.clicked}>Login</NavigationItem> 
      : <NavigationItem path="/logout" exact clicked={props.clicked}>Logout</NavigationItem>}
  </ul>
);

export default navigationItems;

