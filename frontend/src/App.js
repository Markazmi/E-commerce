import './App.css';
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { Home } from './components/layouts/Home';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { ProductDetails } from './components/layouts/product/productDetails';
import { Login } from './components/user/Login';
import store from './Store'
import { Register } from './components/user/Register';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userActions';
import { Elements } from '@stripe/react-stripe-js';
import { Profile } from './components/user/Profile';
import { ProtectedRoutes } from './components/route/ProtectedRoutes';
import { ErrorPage } from './components/ErrorPage';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from './components/user/ForgotPassword';
import { NewPassword } from './components/user/NewPassword';
import { Cart } from './cart/Cart';
import {Shipping} from './cart/Shipping'
import { ConfirmOrder } from './cart/ConfirmOrder';
import axios from 'axios';
import { Payment } from './cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSuccess } from './cart/OrderSuccess';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(()=>{
    store.dispatch(loadUser())


    async function getStripeApiKey(){
      const {data}= await axios('/api/v1/stripeapi')
      console.log(data);
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  return (
    
      <BrowserRouter>
      <div className='App'>
        <Header/>

        <div className='container container-fluid'>
          <Routes>
            {/* absolute route */}
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            {/* relative route */}
            <Route path='/me' element={
            <ProtectedRoutes>
              <Profile/>
            </ProtectedRoutes>
            }/> 
            {/* /* <Route path='/me' element={<Profile/>}/> */}
            <Route path='/me/update' element={
            <ProtectedRoutes>
              <UpdateProfile/>
            </ProtectedRoutes>
            }/>
            <Route path='/update/password' element={
            <ProtectedRoutes>
              <UpdatePassword/>
            </ProtectedRoutes>
            }/>
            <Route path='/shipping' element={
            <ProtectedRoutes>
              <Shipping/>
            </ProtectedRoutes>
            }/>
            <Route path='/order/confirm' element={
            <ProtectedRoutes>
              <ConfirmOrder/>
            </ProtectedRoutes>
            }/>
             <Route path='/success' element={
            <ProtectedRoutes>
              <OrderSuccess/>
            </ProtectedRoutes>
            }/>


            {stripeApiKey &&(
               <Route path='/payment' 
               element={


               <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoutes>
                  <Payment/>
                </ProtectedRoutes>
                </Elements>
                }/>
            )}
           


            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/password/reset/:token' element={<NewPassword/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

            <Route path='/search/:keyword' element={<Home/>}/>
            <Route path ='/product/:id' element={<ProductDetails/>}/>
            <Route path='*' element= {<ErrorPage/>}/>
          </Routes>
          
        </div>
        <Footer/>
      </div>
     </BrowserRouter>

   
  );
}

export default App;
