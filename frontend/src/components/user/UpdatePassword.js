import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors,updatePassword} from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { MetaData } from '../layouts/MetaData';
import { Loader } from '../Loader';

export const UpdatePassword = () => {

    const [oldPassword, setOldPassword]= useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const {success,loading,error}= useSelector((state)=> state.updateUser)

    const alert=useAlert()
    const navigate=useNavigate()
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(success){
            alert.success("password updated successfully")

            navigate('/me')
            dispatch({type: UPDATE_PASSWORD_RESET})
        }

    
    }, [navigate,error,alert,success,dispatch]);
    
    const submitHandler=(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.set('oldPassword',oldPassword)
        formData.set('password',password)
        
        dispatch(updatePassword(formData))
    }
  return(
      <>
       {loading ? (
        <Loader />
        
      ) : (
        <>
          <MetaData title={'Update Password'} />
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mt-2 mb-5'>Update Password</h1>
                <div className='form-group'>
                  <label htmlFor='old_password_field'>Old Password</label>
                  <input
                    type='password'
                    id='old_password_field'
                    className='form-control'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='new_password_field'>New Password</label>
                  <input
                    type='password'
                    id='new_password_field'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                  disabled={loading ? true : false}
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      </>

  )
};
