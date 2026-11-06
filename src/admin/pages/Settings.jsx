import React from 'react'
import Sidebar from '../componets/Sidebar'
import AdmiHeader from '../componets/AdmiHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Settings() {
  return (
    <>
     <AdmiHeader />
      <div className='md:grid grid-cols-5 '>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4 px-5'>
          <h1 className='text-2xl font-bold text-center my-10'>

            Settings
          </h1>
          <div className='md:grid grid-cols-2 gap-x-5'>
            <div>
              <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo eligendi nisi possimus, perferendis nihil ipsam neque aspernatur rerum quam voluptatum, molestiae quibusdam. Amet itaque consequuntur dolor dignissimos accusamus, quod hic!quam voluptatum, molestiae quibusdam. Amet itaque consequuntur dolor dignissimos accusamus, quod hic!</p>
              <br />
              <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo eligendi nisi possimus, perferendis nihil ipsam neque aspernatur rerum quam voluptatum, molestiae quibusdam. Amet itaque consequuntur dolor dignissimos accusamus, quod hic!</p>
              quam voluptatum, molestiae quibusdam. Amet itaque consequuntur dolor dignissimos accusamus, quod hic!
            </div>
            <div className='rounded bg-blue-100 p-5 flex flex-col justify-center items-center'>
              <input  type="file" id='adminpic' className='hidden' />

              <label htmlFor="adminpic" className='relative'>
                
                    <img src= "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1122.jpg" style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="" />


                

                <FontAwesomeIcon icon={faPen} className='bg-yellow-500 p-2 absolute text-white rounded' style={{ marginLeft: '60px', marginTop: '-30px' }} />
              </label>-
              <div className="w-full my-3">
                <input  className='p-2 bg-white border border-gray-200 text-blavk w-full rounded placeholder-gray-600' type="text" placeholder='User Name' />

              </div>
              <div className="w-full mb-3">
                <input  className='p-2 bg-white border border-gray-200 text-blavk w-full rounded placeholder-gray-600' type="password" placeholder='Password' />
              </div>
              <div className="w-full mb-3">
                <input  className='p-2 bg-white border border-gray-200 text-blavk w-full rounded placeholder-gray-600' type="password" placeholder='Confirm Password' />
              </div>
              <div>
                <button className='bg-yellow-500 font-bold text-white p-2 rounded me-2 w-50' >RESET</button>
                <button className='bg-green-700 font-bold text-white p-2 rounded me-2 w-50' >UPDATE</button>
              </div>


            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Settings