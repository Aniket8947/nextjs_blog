import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function SignIn() {
  const dispatch = useDispatch();
  const {loading, error } = useSelector( (state) => state.user)
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormdata({ ...formdata, [e.target.id] : e.target.value.trim() })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formdata.email || !formdata.password){
      return dispatch(signInFailure('All fields must be filled'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json' },
        body : JSON.stringify(formdata),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='min-h-screen mt-52'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20'>
      <div className='flex-1'>
      <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-500
             via-indigo-500 to-emerald-500 rounded-lg text-white'> WriteUp</span>
            Blog
        </Link>
        <p className='text-sm mt-5'> Write up the blog and post here. You can sign In with
           your email and password or with google </p>
      </div>
      <div className='flex-1'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value = 'Your email' />
          <TextInput type ='email' placeholder='name@company.com' id ='email' onChange={handleChange} />
        </div>
        <div>
          <Label value = 'Your password' />
          <TextInput type ='password' placeholder='***********' id ='password' onChange={handleChange} />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
          { loading ? (
            <>
            <Spinner size = 'sm' />
            <span className='pl-3'>Loading...</span>
            </>) : 'Sign Up' 
          }
        </Button>
      </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span>Don't have an account ?</span>
        <Link to='signup' className='text-blue-500'>
        Sign Up
        </Link>
      </div>
      {error && 
         <Alert className='mt-5' color='failure'>
          {error}
         </Alert>
      }
      </div>
      </div>
    </div>
  )
}
