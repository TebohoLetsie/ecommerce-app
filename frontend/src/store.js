import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer,productDeleteReducer,productReviewCreateReducer ,productUpdateReducer,productCreateReducer, productTopRatedReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,
     userDeleteReducer ,userListReducer,userUpdateReducer} from './reducers/userReducers'
import {orderCreateReducer,orderListMyReducer,orderDetailsReducer,orderPayReducer, orderListReducer, orderDeliverReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productReviewCreate: productReviewCreateReducer ,
    productUpdate: productUpdateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
    
    
    
})

const  cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') ):[]

const  userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ):null

const  shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress') ):{}


const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;