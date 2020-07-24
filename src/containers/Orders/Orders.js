import React, { useEffect } from 'react';
import classes from './Orders.css'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

export const Orders = (props) => {

  const {onFetchOrders } = props

  useEffect(()=>{
    onFetchOrders(props.tokenREDUX, props.userIdREDUX);
  },[onFetchOrders])

  let orders = <Spinner />
  if (!props.loadingREDUX) {
    orders =       
        props.orderREDUX.map(order=>{
        return <Order 
            key={order.id}
            orderId={order.id}
            ingredients={order.ingredients}
            deliveryMethod={order.deliveryMethod}
            price={+order.price}
          />
      })
  }
  
  return (
    <div className={classes.Orders}>
      <h4>Order History</h4>
      {orders}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orderREDUX: state.order.orders,
    loadingREDUX: state.order.loading,
    tokenREDUX: state.auth.token,
    userIdREDUX: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders,axios));

