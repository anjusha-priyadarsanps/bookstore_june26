import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getBooksAPI } from '../../services/allApi'
import { searchContext } from '../../context/SearchContext'



function AllBokks() {
  const [listStatus, setListStatus] = useState(false)
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [dummyallBooks, setDummyAllBooks] = useState([])
  const [categoryList, setCategoryList] = useState([])
  console.log(dummyallBooks);
    const { searchKey, setSearchKey } = useContext(searchContext)
  

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
    getBooks()
  }, [searchKey])
  const getBooks = async () => {
    const res = await getBooksAPI(searchKey)
    // console.log(res);
    if (res.status == 200) {
      setAllBooks(res.data)
      setDummyAllBooks(res.data)
      const tempCategoryList = res.data.map(bk => bk.category)
      setCategoryList([...new Set(tempCategoryList)])

    }

  }

  const filterBooks = (category) => {
    console.log(category);
    if (category != 'all') {
      setAllBooks(dummyallBooks?.filter(book => book.category == category)
      )
    }
    else {
      getBooks()
    }
  }
  return (
    <>
      <Header />
      {
        token ?
          <>
            <div className='flex justify-center items-center flex-col my-5'>
              <h1 className='text-3xl font-bold'>Collections</h1>
              <div className='flex my-5'>
                <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" className='p-2 border border-gay-200 text-black w-full placeholder-gray-600' placeholder='search by title' />

              </div>

            </div>
            {/* grid */}
            <div className='md:grid grid-cols-4 md:px-10 p-5'>
              <div className='col-span-1'>
                <div className='flex justify-between items-center'>
                  <h1 className='mb-5 text-2xl font-semibold'>Filters</h1>
                  <button onClick={() => setListStatus(!listStatus)} className='text-3xl md:hidden'><FontAwesomeIcon icon={faEllipsis} /></button>
                </div>
                <div className={listStatus ? 'block ' : 'hidden md:block'}>
                  {
                    categoryList?.map(cat => (
                      <div className='my-2' >
                        <label>
                          <input onClick={() => filterBooks(cat)} type="radio" id='literary' name='filter' className='me-2' />
                          {cat}

                        </label>
                      </div>
                    ))
                  }
                  <div className='my-2' >
                    <label>
                      <input onClick={() => filterBooks('all')} type="radio" id='NoFilter' name='filter' className='me-2' />
                      No Filter

                    </label>
                  </div>
                </div>
              </div>
              <div className='col-span-3'>

                <div className="md:grid grid-cols-4">
                  {
                    allBooks?.length > 0 ?
                      allBooks?.map(book => (
                        <div hidden={book?.status=='Pending' ||book?.status=='Sold' } className='shadow text-center p-3 m-2 rounded' style={{ height: '320px' }}>
                          <Link to={`/view/${book?._id}/book`}>
                            <img src={book?.imageUrl} alt="" className='h-50 w-50' />
                          </Link>
                          <div className='p-3 flex items-center justify-center flex-col'>
                            <p className=' font-bold text-xl'>{book?.author}</p>
                            <p className=' text-blue-800 text-xl'>{book?.title}</p>
                            <p>{book?.price}</p>
                          </div>

                        </div>
                      ))
                      :
                      <p className='font-bold text-center my-3'>Loading....</p>
                  }




                </div>

              </div>


            </div>
          </>
          :
          <div className='min-h-screen flex justify-center items-center flex-col'>
            <img className='w-50' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" />
            <h4 className='mt-10 text-xl font-bold'>Please <Link className='text-blue-600 underline' to={'/login'}>Login</Link> to Explore more.....</h4>

          </div>
      }




    </>
  )
}

export default AllBokks