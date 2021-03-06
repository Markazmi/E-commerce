import { Search } from "./Search";
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from "../../actions/userActions";
export const Header = () => {
  const alert=useAlert()

  const dispatch = useDispatch()
  
  const {user} = useSelector((state)=>state.auth)
  const {cartItems} = useSelector((state)=>state.cart)
 const handleLogout=()=>{
   dispatch(logoutUser())
   alert.success('logged out successfully')
 }
  return (
    //   select className press cntrl + h to replace all classname spelling
    <nav className='navbar row'>
    <div className='col-12 col-md-3'>
      <div className='navbar-brand'>
        <Link to='/'>
        <img src='./images/logo192.png' alt='Logo' />
        </Link>
      
      </div>
    </div>

    <div className='col-12 col-md-6 mt-2 mt-md-0'>
      <Search/>
      </div>
      <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
      <Link to='/cart' style={{ textDecoration: 'none' }}>
      <span id='cart' className='ml-3'>
        Cart
      </span>
      <span className='ml-1' id='cart_count'>
        {cartItems.length}
      </span>
      </Link>
     {user ? (
       <>
       <div className="ml-4 dropdown d-inline">
         <Link
         to='#'
         className="btn dropdown-toggle text-white mr-4"
         type="button"
         id='dropDownMenuButton'
         data-toggle='dropdown'
         aria-haspopup='true'
         aria-expanded='false'
         >
           <figure className="avatar avatar-nav">
             <img
             src={user.avatar && user.avatar.url}
             alt={user && user.name}
             className="rounded-circle"/>
             <span>{user && user.name}</span>
           </figure>
         
         </Link>
         <div
         className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'>
                {user && user.role !== 'admin'? (
                  <>
                  <Link to='/orders/me'className="dropdown-item">
                  Orders
                  </Link>
                  </>

                ):(
                <Link to='/dashboard' className="dropdown-item">
                Dashboard
                </Link>
                )}
                <Link to='/me'  className='dropdown-item'>
                  Profile
                </Link>
                
                <Link  className='dropdown-item text-danger'
                  to='/'
                  onClick={handleLogout}>
                  Logout
                </Link>  
         </div>
         </div></>

   
     ):(
       <Link to='/login' className='btn ml-4' id='login_btn'>
       Login</Link>
     )}
      
    </div>
  </nav>
  )
};
