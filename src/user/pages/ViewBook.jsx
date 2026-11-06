import React, { useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getSingleBookAPI, paymentkAPI } from '../../services/allApi'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../../api/axiosinstance'



function ViewBook() {
  const [modalStatus, setModalStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getBook()
  }, [])


  const getBook = async () => {
    const res = await getSingleBookAPI(id)
    console.log(res);
    if (res.status == 200) {
      setBookDetails(res.data)
    }

  }

  const makePayment=async()=>{

    const res=await paymentkAPI(id)
    console.log(res);
    if(res.status==200){
      const {checkoutURL}=res.data 
      window.location.href=checkoutURL
    }

  }

 

  return (
      <>
        <Header />
        <div className='md:m-10 m-5'>
          <div className='p-5 border shadow'>
            <div className='md:grid grid-cols-3 gap-10 items-center'>
              <div className='col-span-1'>
                <img className='w-50' src={bookDetails?.imageUrl} alt="" />
              </div>
              <div className='col-span-2'>
                <div className='flex items-center justify-between md:mt-0 mt-10'>
                  <div>
                    <h3 className='font-bold'>{bookDetails?.title}</h3>
                    <p className='text-blue-800'>-{bookDetails?.author}</p>
                  </div>
                  <button onClick={() => setModalStatus(true)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
                <div className='md:grid grid-cols-3 mt-5'>

                  <div>
                    <p className='font-bold'>Publisher:{bookDetails?.publisher}</p> <br />
                    <p className='font-bold'>Category:{bookDetails?.category}</p>

                  </div>
                  <div>
                    <p className='font-bold'>Language:{bookDetails?.language}</p> <br />
                    <p className='font-bold'>Real Price:₹{bookDetails?.price}</p>

                  </div>
                  <div>
                    <p className='font-bold'>No:of Pages:{bookDetails?.pages}</p> <br />
                    <p className='font-bold'>ISBN:{bookDetails?.isbn}</p>

                  </div>

                </div>
                <p className='mt-5 text-justify'>
                  {bookDetails?.abstract}
                </p>
                <div className='mt-5 flex justify-end'>
                  <Link to={'/all-books'} className='bg-blue-900 text-white p-2 rounded'> <FontAwesomeIcon icon={faBackward} />   Back</Link>
                  <button className='bg-green-900 text-white p-2 rounded ms-5' onClick={makePayment} >Buy Now @₹{bookDetails?.discountPrice}</button>

                </div>
              </div>

            </div>

          </div>

        </div>

        {/* modal */}
        {
          modalStatus &&
          <div className='relative z-10'>
            <div className='bg-gray-500/75  inset-0 fixed'>
              <div className='flex items-center justify-center min-h-screen'>
                <div className=' bg-white  w-full md:m-25 m-5'>
                  {/* modal header */}
                  <div className='flex text-white p-3 bg-black items-center justify-between'>
                    <h3>Book Images</h3>
                    <button onClick={() => setModalStatus(false)}>
                      <FontAwesomeIcon icon={faXmark} />

                    </button>
                  </div>
                  {/* modal body */}
                  <div className='bg-white p-5 max-h-screen overflow-y-auto'>
                    <p className='text-blue-700'> <FontAwesomeIcon icon={faCamera} />  camera clicks of the books in the seller hands</p>

                    <div className='md:flex my-4'>
                      {/* duplicate img */}
                      {
                        bookDetails?.uploadImages?.map(filename => (
                          <img src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`} alt="" height={'200px'} width={'200px'} className='m-5' />
                        ))
                      }
                    </div>

                  </div>
                </div>
              </div>




            </div>

          </div>
        }


      </>
    )
  }

  export default ViewBook