import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem path="/burger" exact>Burger Builder</NavigationItem>
    <NavigationItem path="/orders" exact>Orders</NavigationItem>
  </ul>
);

export default navigationItems;