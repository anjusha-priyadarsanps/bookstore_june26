import React, { useEffect } from 'react'
import Header from '../../user/components/UserHeader'
import { Link } from 'react-router-dom'
import { verifypaymentAPI } from '../../services/allApi'


function PaymentSuccess() {

    useEffect(() => {
     verifyPayment()
    }, [])
    

    const verifyPayment=async()=>{

     const sessionId= new URLSearchParams(window.location.search).get("session_id")

     const res=await verifypaymentAPI({sessionId}) 
     console.log(res);
     

    }

    
    return (
        <>
            <Header />
            <div className='container min-h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
                    <div>
                        <h1 className='text-4xl text-blue-700 font-bold'>Congratualations!!!</h1>
                        <p className='text-2xl my-10'>Thank you for purchsing with Bookstore.Hope you have a good time with us.</p>
                        <Link className='bg-blue-700 flex items-center w-40 p-2 rounded text-white' to={'/all-books'}>Explore More Books</Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="" />

                    </div>

                </div>

            </div>

        </>
    )
}

export default PaymentSuccess