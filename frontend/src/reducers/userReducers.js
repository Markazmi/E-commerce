
import { CLEAR_ERRORS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
    
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
   

} from '../constants/userConstants';

export const authReducer = (state={user:{}}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_REQUEST:
        return{
            ...state,
            loading:true,
            isAuthenticated:false
        }      
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_SUCCESS:
        return{
        ...state, 
        loading:false,
        isAuthenticated: true,
        user: action.payload
    }
    case LOGOUT_SUCCESS:
        return{
            loading:false,
            isAuthenticated:false,
            user:null
        }
    case LOGOUT_FAIL:
        return{
            ...state,
        error: action.payload        }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_FAIL:
        return{
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error: action.payload
          

        }
       case CLEAR_ERRORS: 
           return{
           ...state,
            error:null

    }
  
      default:
         return state;
  }  

};
export const updateUserReducer=(state={},action)=>{
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                success:action.payload,
                loading:false

            }
            case UPDATE_PROFILE_FAIL:
                case UPDATE_PASSWORD_FAIL:
                return{
                    ...state,
                    error:action.payload,
                    loading:false
                }
                case UPDATE_PROFILE_RESET:
                    case UPDATE_PASSWORD_RESET:
                    return{
                      ...state,
                       success: false 
                    }
        default:
            return state;
    }
}
export const forgotPasswordReducer = (state = {}, action)=>{
switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
        return{
            ...state,
            loading: true,
            error:null,

        }
        case NEW_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                success: action.payload,
            }
    case FORGOT_PASSWORD_SUCCESS:
        return{
            ...state,
            loading: false,
            message: action.payload
        }    
        case FORGOT_PASSWORD_FAIL:
            case NEW_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload
            }

    default:
        return state;
}}