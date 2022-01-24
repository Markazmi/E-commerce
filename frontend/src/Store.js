import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {productsReducer, SingleProdReducer} from './reducers/productReducers'


const reducer = combineReducers({
    products: productsReducer,
    SingleProd: SingleProdReducer
})

const initialState = {}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)))

export default store;

// proxy=connects frontend and backend 