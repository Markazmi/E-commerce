import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {productDetailsReducer, productsReducer} from './reducers/productReducers'
import { authReducer, forgotPasswordReducer, updateUserReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    products: productsReducer,
    // getting singlr product
    productDetails: productDetailsReducer,
    auth: authReducer,
    updateUser: updateUserReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer
})

const initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems')
    ?
JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo:  localStorage.getItem('shippingInfo')
        ?
        JSON.parse(localStorage.getItem('shippingInfo')):{},
}

}
const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)))

export default store;

// proxy=connects frontend and backend 