import React from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/profileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import OrderScreen from './screens/OrderScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router,Route} from 'react-router-dom'


const App = ()=>{
    return(
      <Router>
              <Header />
            <main className="py-3">
            <Container>
                 <Route path='/login' component={LoginScreen} />
                 <Route path='/order/:id' component={OrderScreen} />
                 <Route path='/register' component={RegisterScreen} />
                 <Route path='/profile' component={ProfileScreen} />
                 <Route path='/admin/userlist' component={UserListScreen} />
                 <Route path='/shipping' component={ShippingScreen} />
                 <Route path='/payment' component={PaymentScreen} />
                 <Route path='/admin/user/:id/edit' component={UserEditScreen} />
                 <Route path='/placeorder' component={PlaceOrderScreen} />  
                 <Route path='/placeorder' component={PlaceOrderScreen} /> 
                 <Route path='/product/:id' component={ProductScreen} />
                 <Route path="/admin/productlist" component={ProductListScreen} exact />
                 <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
                 <Route path="/admin/orderlist" component={OrderListScreen} />
                 <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
                 <Route path='/cart/:id?' component={CartScreen} />
                 <Route path='/search/:keyword' component={HomeScreen} />
                 <Route path='/page/:pageNumber' component={HomeScreen} exact/>
                 <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
                 <Route path='/' component={HomeScreen} exact/>

            </Container>
        
            </main>
            <Footer />
        </Router>
    )
}


export default App;