import React, { useState } from 'react';
import {connect} from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


export const Layout = ({isAuthenticated, children}) => {
  
  const [sideDrawerIsVisible, setDrawerIsVisible] = useState(false);
  
  const sideDrawerClosedHandler = () => {
    setDrawerIsVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setDrawerIsVisible(!sideDrawerIsVisible)
  }

  return (
    <Auxiliary>
      <Toolbar 
        isAuth={isAuthenticated}
        toggleDrawerToggle={sideDrawerToggleHandler}
      />
      <SideDrawer 
          isAuth={isAuthenticated}
          open={sideDrawerIsVisible} 
          closed={sideDrawerClosedHandler}
      />  

      <main className={classes.Content}>
        {children}
      </main>
  </Auxiliary>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};


export default connect(
  mapStateToProps

)(Layout);


