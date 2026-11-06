import React, { useState } from 'react'
import Sidebar from '../componets/Sidebar'
import AdmiHeader from '../componets/AdmiHeader'
import { Link } from 'react-router-dom'
import { BooksAPI, editBookStatusAPI, getUserAPI } from '../../services/allApi'
import { useEffect } from 'react'
import axiosInstance from '../../api/axiosinstance'

function Resource() {
  const [bookstatus, setBookstatus] = useState(true)
  const [userstatus, setUserstatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [users, setUsers] = useState([])
  // console.log(users);

  useEffect(() => {
    if (bookstatus) {
      getBooks()
    }
    else {
      getUsers()

    }
  }, [bookstatus,userstatus])


  const getBooks = async () => {
    const res = await BooksAPI()
    console.log(res);
    setAllBooks(res.data)


  }
  const updateBookStatus = async (id) => {

    const res = await editBookStatusAPI(id)
    console.log(res);
    if (res.status == 200) {
      getBooks()
    }


  }
  const getUsers = async () => {
    const res = await getUserAPI()
    // console.log(res);

    setUsers(res.data)
  }
  return (
    <>
      <AdmiHeader />
      <div className='md:grid grid-cols-5 gap-10'>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4'>
          <div>
            {/* tabs */}
            <div className='flex justify-center items-center my-5'>
              <p onClick={() => { setBookstatus(true); setUserstatus(false); }} className={bookstatus ? 'text-blue-700 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 text-blck border-gray-200 border-b'}> Book List</p>

              <p onClick={() => { setBookstatus(false); setUserstatus(true); }} className={userstatus ? 'text-blue-700 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 text-blck border-gray-200 border-b'}> User List</p>


            </div>
            {/* {contents} */}
            {
              bookstatus &&
              <div className="md:grid grid-cols-4">

                {/* card */}


                {
                  allBooks?.length > 0 ?
                    allBooks?.map(bk => (
                      <div className='shadow text-center p-3 m-2 rounded' style={{ height: '380px' }}>
                        <img src={bk?.imageUrl} alt="" className='h-50 w-50' />
                        <div className='p-3 flex items-center justify-center flex-col'>
                          <p className=' font-bold text-xl'>{bk?.author}</p>
                          <p className=' text-blue-800 text-xl'>{bk?.title}</p>
                          <p>{bk?.price}</p>
                          {
                            bk?.status != 'Approved' ?
                              <button className='bg-blue-700 text-white font-bold p-2 w-full' onClick={() => updateBookStatus(bk?._id)}>Approve</button>
                              :
                              <img src="https://img.magnific.com/premium-vector/green-check-mark-icon-approved-symbol-handdrawn-tick-sign-circle-shape-flat-checkmark-sign_856131-246.jpg?semt=ais_hybrid&w=740&q=80" width={50} alt="" />

                          }

                        </div>


                      </div>
                    ))


                    :
                    <p>Loading</p>

                }


              </div>
            }

            {userstatus &&
              <div className='md:grid grid-cols-3 w-full my-5'>

                {
                  users?.length > 0 ?
                    users?.map(user => (
                      <div className='shadow rounded p-3 mx-4 bg-gray-200 m-2'>
                        <p className='text-red-700 font-bold text-lg'>ID::{user?._id}</p>
                        <div className='flex items-center justify-center mt-3'>
                          <img src={user?.picture == "" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10' : user?.picture?.startsWith('https://lh3.googleusercontent.com/') ? user.picture : `${axiosInstance.defaults.baseURL}/uploads/${user?.picture}`} width={'100px'} style={{ borderRadius: '50%' }} height={'100px'} alt="" />
                          <div className='flex flex-col text-lg ml-6'>
                            <p className='text-blue-800 font-bold'>{user.username}</p>
                            <p>{user?.email}</p>
                          </div>
                        </div>
                      </div>
                    )) :
                    <p className='text-red-700 text-center my-5'>No User Found</p>
                }


              </div>
            }
          </div>
        </div>

      </div>
    </>
  )
}

export default Resource