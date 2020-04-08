import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.path}
        exact={props.exact}
        activeClassName={classes.active}
        >{props.children}</NavLink>
      {/* <a 
        href={props.link} 
        className={props.active ? classes.active : null }></a>
      */}
      </li> 
);

export default navigationItem;