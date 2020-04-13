import React, { Component } from 'react';
import classes from './Orders.css'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loadingREDUX) {
      orders =       
          this.props.orderREDUX.map(order=>{
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
}

const mapStateToProps = (state) => {
  return {
    orderREDUX: state.order.orders,
    loadingREDUX: state.order.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders,axios));


