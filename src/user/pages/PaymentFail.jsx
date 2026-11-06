import React from 'react'
import Header from '../../user/components/UserHeader'
import { Link } from 'react-router-dom'

function PaymentFail() {
    return (
        <>
            <Header />
            <div className='container min-h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
                    <div>
                        <h1 className='text-4xl text-blue-700 font-bold'>Sorry! Payment is Declined</h1>
                        <p className='text-2xl my-10'>We  appologise the inconvience caused and Appreciate your visit to Bookstore</p>
                        <Link className='bg-blue-700 flex items-center w-40 p-2 rounded text-white' to={'/all-books'}>Explore More Books</Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" />

                    </div>

                </div>

            </div>
        </>
    )
}

export default PaymentFail