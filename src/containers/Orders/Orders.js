import React, { Component } from 'react';
import classes from './Orders.css'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
  state={
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response=>{
        // console.log(response.data) //object with ID as key and object of customer data as value
        const fetchedOrders=[];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        console.log(fetchedOrders);
        this.setState({orders:fetchedOrders, loading: false})
      })
      .catch(err=>{
        this.setState({loading: false})
      })
  }

  render() {

    return (
      <div className={classes.Orders}>
        <h4>Order History</h4>
        {this.state.orders.map(order=>{
          return <Order 
            key={order.id}
            orderId={order.id}
            ingredients={order.ingredients}
            deliveryMethod={order.deliveryMethod}
            price={+order.price}

            />
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders,axios) ;
