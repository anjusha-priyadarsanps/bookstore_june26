import React, { useEffect, useState } from 'react'
import Header from '../../user/components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allApi'
import { useContext } from 'react'
import { searchContext } from '../../context/SearchContext'
import { ToastContainer, toast } from 'react-toastify';



function Home() {

  const [homeBooks, setHomeBooks] = useState([])
  // console.log(homeBooks);
  const { searchKey, setSearchKey } = useContext(searchContext)
  const navigate = useNavigate()
  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const res = await getHomeBookAPI()
    console.log(res);

    if (res.status == 200) {
      setHomeBooks(res.data)
    }

  }
  const handleSearch = () => {
    if (!searchKey) {
      toast.warning("please input a book title here!")

    }
    else if (!sessionStorage.getItem("token")) {
      toast.warning("please Login!!!")
      setTimeout(() => {
        navigate('/login')

      }, 2000);
    }
    else if (searchKey && sessionStorage.getItem("token")) {
      navigate('/all-books')
    }
    else {
      toast.error("something went wrong")
    }

  }

  return (
    <>
      <Header />
      <div style={{ height: '450px' }} className='bg-[url("https://upload.wikimedia.org/wikipedia/commons/5/5a/Books_HD_%288314929977%29.jpg")] bg-cover bg-top text-white'>
        <div style={{ height: '450px', backgroundColor: 'rgba(0,0,0,0.5)' }} className='flex flex-col  justify-center items-center w-full'>
          <h1 className='text-5xl font-bold' style={{ fontFamily: 'Dancing Script' }}>Wonderful Gifts</h1>
          <p className='mt-5'>Give your family and friends a book</p>
          <div className='mt-9'>
            <input type="text" placeholder='Search Books' className='bg-white p-2 rounded-xl placeholder-gray-500 w-100 text-black' onChange={(e) => setSearchKey(e.target.value)} />
            <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='text-gray-700' style={{ marginLeft: '-30px' }} />
          </div>
        </div>


      </div>
      {/* arrival */}
      <div className='p-5 flex flex-col justify-center items-center mt-10'>

        <h1 className='text-2xl font-bold'>NEW ARRIVALS</h1>
        <h2 className='text-2xl font-bold mt-2'>Explore Our Latest Collection</h2>

        <div className="grid grid-cols-4 w-full mt-5">

          {/* card */}
          {
            homeBooks?.length > 0 ?
              homeBooks?.map(book => (
                <div className='p-5'>
                  <div className="shadow p-3 p-rounded">
                    <img src={book?.imageUrl} alt="" className='w-full h-70' />
                    <div className='flex flex-col justify-center items-center mt-4'>
                      <p className='text-blue-900 font-bold text-lg'>{book?.author}</p>
                      <p>{book?.title}</p>
                      <p>{book?.price}</p>
                    </div>
                  </div>

                </div>

              ))
              :
              <p className='font-bold text-center my-3'>Loading....</p>
          }


        </div>
        <div text-center my-5>
          <Link to={'/all-books'} className='bg-blue-600 p-3 mt-5 text-white font-bold'>Explore More</Link>
        </div>

      </div>
      {/* Featured */}
      <section className='md:grid grid-cols-2 my-5 p-10 gap-10'>

        <div>
          <h1 className='text-center text-xl font-bold'> FEATURED AUTHORS</h1>
          <h1 className='text-center text-xl font-bold'>Captivates With Every Words</h1>
          <p className='mb-2 mt-5 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>

          <p className='my-2 text-justify'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>

        </div>
        <div>
          <img src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg" alt="" />
        </div>

      </section>
      {/* testimonials */}
      <section className=' p-5 flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold'>TESTIMONIALS </h1>
        <h1 className='text-xl mt-2'>See What Others Are Saying
        </h1>
        <div className='my-5 flex flex-col justify-center items-center'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" style={{ height: '100px', width: '100px', borderRadius: '50%' }} alt="" />
          <h4 className='font-bold text-lg my-2'>Teressa Joy</h4>

          <p className='my-2 px-10 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit voluptatum atque beatae magnam non nihil. Totam obcaecati aut asperiores numquam explicabo aliquam quia velit incidunt, dolores mollitia at optio!
            Nesciunt dolorum excepturi repudiandae amet soluta qui iusto cumque? Magni sed incidunt sunt voluptatibus porro nostrum perspiciatis. Dolores dolorem nihil placeat nulla voluptatum consequuntur quaerat, fugit tempora, saepe reprehenderit totam!</p>
        </div>

      </section>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />


    </>
  )
}

export default Home