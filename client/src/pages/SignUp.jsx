import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormdata({ ...formdata, [e.target.id] : e.target.value.trim() })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formdata.username || !formdata.email || !formdata.password){
      return setError("Please fill all the fields");
    }
    try{
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json' },
        body : JSON.stringify(formdata),
      });
      const data = await res.json();
      if(data.success === false){
        return setError(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
        <p className='text-sm mt-5'> Write up the blog and post here. You can sign up with
           your email and password or with google </p>
      </div>
      <div className='flex-1'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value = 'Your username' />
          <TextInput type ='text' placeholder='Username' id ='username' onChange={handleChange}/>
        </div>
        <div>
          <Label value = 'Your email' />
          <TextInput type ='email' placeholder='name@company.com' id ='email' onChange={handleChange} />
        </div>
        <div>
          <Label value = 'Your password' />
          <TextInput type ='password' placeholder='Password' id ='password' onChange={handleChange} />
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
        <span>Have an account?</span>
        <Link to='signin' className='text-blue-500'>
        Sign In
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
