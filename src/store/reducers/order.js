import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseInit = (state,action) => {
  return updatedObject(state,{purchased: false,})
}
const purchaseBurgerStart = (state,action) => {
  return updatedObject(state,{loading: true,})
}
const purchaseBurgerSuccess = (state,action) => {
  const newOrder = updatedObject(...action.orderData,{id: action.orderId})
  return updatedObject(state,{loading: false,purchased: true,orders: state.orders.concat(newOrder)})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit (state,action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart (state,action);
     case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess (state,action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updatedObject(state,{loading: false,})
    case actionTypes.FETCH_ORDERS_START: 
      return updatedObject(state,{loading: true,})
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updatedObject(state,{orders: action.orders,loading: false,})
    case actionTypes.FETCH_ORDERS_FAIL:
      return updatedObject(state,{loading: false})  
    default:
      return state;
  }

}


export default reducer;