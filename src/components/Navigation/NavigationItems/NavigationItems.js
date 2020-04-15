import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem path="/burger" exact>Burger Builder</NavigationItem>
    {props.isAuth ? 
      <NavigationItem path="/orders" exact>Orders</NavigationItem>
      : null}
    {!props.isAuth ? 
      <NavigationItem path="/auth" exact>Login</NavigationItem> 
      : <NavigationItem path="/logout" exact>Logout</NavigationItem>}
  </ul>
);

export default navigationItems;

