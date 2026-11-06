import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faGear, faHome } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../api/axiosinstance'
function Sidebar() {
  
  const [userName, setUserName] = useState("")
  const [dp, setDp] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("user")) {

      let user = JSON.parse(sessionStorage.getItem("user"))
      setUserName(user.username)
      setDp(user.picture)

    }
  }, [])

  return (
    <div className='bg-blue-200 min-h-screen flex text-center flex-col p-10'>
      <img src={dp == "" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10' : dp?.startsWith('https://lh3.googleusercontent.com/') ? dp : `${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" className='ms-10' style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
      <h1 className='text-xl mt-3  font-bold text-center'>{userName}</h1>

      <div className='text-start mx-auto'>
        <div className='mt-10 '>
          <Link to={'/admin-dashboard'} className='font-bold text-xl'> <FontAwesomeIcon icon={faHome} /> <span className='ms-5'>Home</span></Link>

        </div>
        <div className='mt-3'>
          <Link to={'/admin-resources'} className='font-bold text-xl'> <FontAwesomeIcon icon={faBook} /> <span className='ms-5'>All Books</span></Link>

        </div>

        <div className='mt-3'>
          <Link to={'/admin-settings'} className='font-bold text-xl'> <FontAwesomeIcon icon={faGear} /> <span className='ms-5'>Settings</span></Link>

        </div>
      </div>
    </div>
  )
}

export default Sidebar