import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleloginAPI, loginAPI, registerAPI } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routerContext } from '../context/RouterGuardContext'

function Auth({ register }) {
  const { setRole, setAuthorizedUser } = useContext(routerContext)
  const [togglePasswordtype, setTogglePasswordType] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({

    initialValues: {
      username: 'demo',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({

      username: Yup.string().min(3, "Must be atleast 3 characters").required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().required("Required")

    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (register) {
        console.log("register api");
        hanleRegister(values)

      }
      else {
        console.log("login api");
        handleLogin(values)
      }
      resetForm()

    }

  })

  const hanleRegister = async (userData) => {

    const result = await registerAPI(userData)
    // console.log(result);
    if (result.status == 200) {

      toast.success("Registration successfull..Please Login")
    }
    else if (result.status == 409) {

      toast.error(result.response)

    }
    navigate('/login')



  }

  const handleLogin = async (userdata) => {


    const result = await loginAPI(userdata)
    console.log(result);
    if (result.status == 200) {
      toast.success("login Seccessfull!!")
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorizedUser(true)
      if (result.data.user.role == 'admin') {
        setRole('admin')
        navigate(`/admin-dashboard`)

      }
      else {
        setRole('user')
        navigate('/')

      }
    }
    else {
      toast.error(result.response)
    }


  }

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("inside google login");

    const { name, email, picture } = jwtDecode(credentialResponse.credential)

    const res = await googleloginAPI({ username: name, email, password: "googlepassword", picture })
    console.log(res);
    if (res.status == 200) {
      toast.success("login successfull")
      sessionStorage.setItem("user", JSON.stringify(res.data.user))
      sessionStorage.setItem("token", res.data.token)
      setAuthorizedUser(true)
      setTimeout(() => {
        setRole('user')
        navigate('/')
      }, 2500);
    }




  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-[url("/bg.jpg")] bg-cover bg-center'>


      <div className='w-full flex items-center justify-center flex-col p-10'>
        <h1 className='text-4xl font-bold text-white'>BOOK STORE</h1>

        <div className='bg-black text-white p-5 flex flex-col w-2/4  items-center justify-center mt-5 rounded'>

          <div style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='border-2 mb-5 flex justify-center items-center'>
            <FontAwesomeIcon icon={faUser} className='text-5xl' />
          </div>
          {
            register ? <h3 className='text-xl font-bold'>Register</h3> : <h3 className='text-xl font-bold'>Login</h3>
          }
          <form className='w-full' onSubmit={formik.handleSubmit}>
            {
              register &&
              <div className='mt-5 w-full'>
                <input name='username' onChange={formik.handleChange} value={formik.values.username} type="text" className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='User Name' />
                <div className='text-yellow-400 mt-3'>{formik.errors.username}</div>
              </div>
            }
            <div className='mt-5 w-full'>
              <input name='email' onChange={formik.handleChange} value={formik.values.email} type="text" className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Email Id' />
              <div className='text-yellow-400 mt-3'>{formik.errors.email}</div>

            </div>
            <div className='mt-5 w-full relative' >
              <input name='password' onChange={formik.handleChange} value={formik.values.password} type={togglePasswordtype ? 'text' : 'password'} className='bg-white text-black absolute placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Password' />
              {
                togglePasswordtype ?
                  <FontAwesomeIcon onClick={() => setTogglePasswordType(false)} icon={faEyeSlash} className='text-gray-700 absolute' style={{ right: '30px', top: '10px' }} />
                  :
                  <FontAwesomeIcon onClick={() => setTogglePasswordType(true)} icon={faEye} className='text-gray-700 absolute' style={{ right: '30px', top: '10px' }} />
              }
              <div className='text-yellow-400 mt-3'>{formik.errors.password}</div>

            </div>
            <p className='text-yellow-500 mt-2'>*Never share password with others</p>
            {
              register ? <button type='submit' className='bg-green-900 text-white p-2 w-full mt-10 rounded'>SIGNUP</button>
                :
                <button type='submit' className='bg-green-900 text-white p-2 w-full mt-10 rounded '>LOGIN</button>
            }
          </form>
          {
            !register &&
            <div className='my-5 text-center w-full'>
              <p>------------------------------------------------or---------------------------------------------------</p>
              {/* sign in with google */}
              <div className='d-flex justify-center items-center w-full'>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>
            </div>}
          {
            register ?
              <p className='text-center mt-3'>Alreday have an account? <Link className='text-blue-700 underline' to={'/login'}>Login</Link></p>
              : <p className='text-center mt-3'>Don't have an account yet? <Link className='text-blue-700 underline' to={'/signup'}>Register</Link></p>
          }
        </div>

      </div>

      {/* toaser */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />


    </div>
  )
}

export default Auth