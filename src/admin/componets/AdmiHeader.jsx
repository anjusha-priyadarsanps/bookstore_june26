import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { routerContext } from '../../context/RouterGuardContext'


function AdmiHeader() {

const { setAuthorizedUser } = useContext(routerContext)
  
const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setAuthorizedUser(false)
    navigate('/login')

  }
  return (
    <>
   <div className='flex justify-between p-3'>
        {/* logo */}
        <div className='flex items-center'>
          <img src="https://bookstore-wine-nu.vercel.app/logo.png" width={'50px'} alt="" />
          <h1 className=' text-2xl text-black font-bold ms-4 '>BOOKSTORE</h1>
        </div>

        {/* Logout block */}
        <div className=''>
          <button  className='p-2 border border-black rounded' onClick={logout}> <FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</button>
        </div>


      </div>
      <div className='w-full p-3 bg-blue-950  text-white'>

        <marquee>Welcome,  Admin! You're all set to manage and monitor the system. Let’s get to work!</marquee>

      </div>
    </>
  )
}

export default AdmiHeader