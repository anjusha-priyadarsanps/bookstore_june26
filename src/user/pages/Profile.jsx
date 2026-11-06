import React, { useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen, faPenSquare, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import Edit from '../components/Edit'
import axiosInstance from '../../api/axiosinstance'
import { toast, ToastContainer } from 'react-toastify'
import { addBookAPI, getAbstractAPI, getBoughtBooksAPI, getUserBooksAPI, removeBookAPI } from '../../services/allApi'
import useDebounce from '../../hooks/useDebounce'


function Profile() {
  const [sellBookstatus, setsellBookstatus] = useState(true)
  const [bookstatus, setBookstatus] = useState(false)
  const [purchasestatus, setPurchasetatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [userName, setUserName] = useState("")
  const [dp, setDp] = useState("")
  const [bio, setBio] = useState("")
  const [bookDetails, setBookdetails] = useState({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", category: "", uploadImages: [] })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [uploadedBooks, setUploadedBooks] = useState([])
  const [purchasededBooks, setpurchasededBooks] = useState([])
 const debouncedTitleSearch= useDebounce(bookDetails.title,500)

  // console.log(bookDetails);
  // console.log(preview);
  // console.log(previewList);


  useEffect(() => {

    if (sessionStorage.getItem("user")) {

      let user = JSON.parse(sessionStorage.getItem("user"))
      setUserName(user.username)
      setDp(user.picture)
      setBio(user.bio)

    }
  }, [])

  useEffect(() => {
    if (bookstatus) {
      getUserBooks()

    }
    else if (purchasestatus) {
      userBoughtBook()

    }
  }, [bookstatus, purchasestatus])
  useEffect(() => {
    if(debouncedTitleSearch){
      console.log("gemini api call");
      generateBookAbstract()
      
    }
    
  }, [debouncedTitleSearch])
  


const generateBookAbstract=async()=>{
  const res=await getAbstractAPI(debouncedTitleSearch)
  // console.log(res);
  if(res.status==200){
    setBookdetails({...bookDetails,abstract:res.data.content})
  }
  
}

  const handleFileUpload = (e) => {

    const imgFile = e.target.files[0]
    setBookdetails({ ...bookDetails, uploadImages: [...bookDetails?.uploadImages, imgFile] })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList, url])


  }
  const getUserBooks = async () => {
    const res = await getUserBooksAPI()
    console.log(res);
    if (res.status == 200) {
      setUploadedBooks(res.data)
    }

  }

  const resetForm = () => {
    setBookdetails({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", category: "", uploadImages: [] })
    setPreview("")
    setPreviewList([])
  }

  const handleAddBook = async () => {
    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages } = bookDetails
    if (!title && !author && !pages && !imageUrl && !price && !discountPrice && !abstract && !publisher && !isbn && !language && !category && uploadImages.length == 0) {
      toast.warning("fill the form completely")
    }
    else {
      const reqBody = new FormData()
      for (let key in bookDetails) {

        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        }
        else {
          bookDetails.uploadImages.forEach(file => {
            reqBody.append("uploadImages", file)

          })
        }
      }
      const result = await addBookAPI(reqBody)
      console.log(result);
      if (result.status == 200) {
        toast.success("Book added successfully")
      }
      else {
        toast.error(result.response)
      }
      resetForm()


    }
  }

  const removeBook = async (id) => {

    const res = await removeBookAPI(id)

    if (res.status == 200) {
      getUserBooks()
    }


  }
  const userBoughtBook = async () => {

    const res = await getBoughtBooksAPI()
    console.log(res);
    if (res.status == 200) {
      setpurchasededBooks(res.data)
    }


  }
  return (
    <>
      <Header />

      <div style={{ height: '200px' }} className='bg-black mb-10'>

      </div>
      <div style={{ width: "200px", height: '200px', borderRadius: '50%', marginLeft: '70px', marginTop: '-170px' }} className='bg-white p-3'>

        <img style={{ width: "180px", height: '180px', borderRadius: '50%', }} src={dp == "" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10' : dp?.startsWith('https://lh3.googleusercontent.com/') ? dp : `${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" />


      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div className='flex items-center'>
          <h1 className='md:text-3xl text-2xl font-bold'>{userName}</h1>
          <FontAwesomeIcon className='text-blue-600 ms-5' icon={faCircleCheck} />

        </div>
        <div>

          <Edit />
        </div>

      </div>
      <p className='my-3 md:px-20 px-5 text-justify'>
        {bio}
      </p>

      <div className='md:px-40 mt-10'>
        {/* tabs */}
        <div className='flex items-center justify-center my-5'>
          <p onClick={() => { setsellBookstatus(true); setBookstatus(false); setPurchasetatus(false) }} className={sellBookstatus ? 'text-blue-700 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Sell Books</p>

          <p onClick={() => { setsellBookstatus(false); setBookstatus(true); setPurchasetatus(false) }} className={bookstatus ? 'text-blue-700 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Book Status</p>

          <p onClick={() => { setsellBookstatus(false); setBookstatus(false); setPurchasetatus(true) }} className={purchasestatus ? 'text-blue-700 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Purchase History</p>

        </div>
        {/* contents */}


        {/* sell books */}

        {
          sellBookstatus &&
          <div className='p-10 my-20 mx-5 bg-gray-200'>
            <div className='text-center text-xl font-medium'>Book Details</div>
            <div className="md:grid grid-cols-2 mt-10 w-full">
              <div className='px-3'>
                <div className="mb-3 ">
                  <input value={bookDetails.title} onChange={(e) => setBookdetails({ ...bookDetails, title: e.target.value })} placeholder='Title' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>

                <div className="mb-3 ">
                  <input value={bookDetails.author} onChange={(e) => setBookdetails({ ...bookDetails, author: e.target.value })} placeholder='Author' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>

                <div className="mb-3 ">
                  <input value={bookDetails.pages} onChange={(e) => setBookdetails({ ...bookDetails, pages: e.target.value })} placeholder='No:Of Pages' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 ">
                  <input value={bookDetails.imageUrl} onChange={(e) => setBookdetails({ ...bookDetails, imageUrl: e.target.value })} placeholder='Image URL' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 ">
                  <input value={bookDetails.price} onChange={(e) => setBookdetails({ ...bookDetails, price: e.target.value })} placeholder='Price' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 ">
                  <input value={bookDetails.discountPrice} onChange={(e) => setBookdetails({ ...bookDetails, discountPrice: e.target.value })} placeholder='Discount Price' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 ">
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookdetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
              </div>
              <div className='px-3'>

                <div className="mb-3 px-3">
                  <input value={bookDetails.publisher} onChange={(e) => setBookdetails({ ...bookDetails, publisher: e.target.value })} placeholder='Publisher' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>

                <div className="mb-3 px-3">
                  <input value={bookDetails.language} onChange={(e) => setBookdetails({ ...bookDetails, language: e.target.value })} placeholder='Language' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 px-3">
                  <input value={bookDetails.isbn} onChange={(e) => setBookdetails({ ...bookDetails, isbn: e.target.value })} placeholder='ISBN' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                <div className="mb-3 px-3">
                  <input value={bookDetails.category} onChange={(e) => setBookdetails({ ...bookDetails, category: e.target.value })} placeholder='Category' type="text" className="w-full p-2 rounded placeholder-gray-400 text-black bg-white" />
                </div>
                {/* upload book image */}
                <div className="mb-3 flex items-center justify-center pt-5">
                  <label htmlFor="bookimg">
                    <input onChange={(e) => handleFileUpload(e)} type="file" id='bookimg' className='hidden' />

                    <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} width={'150px'} height={'150px'} alt="" />

                  </label>
                </div>
                {/* diplay uploaded images */}
                {preview &&
                  <div className="mb-3 flex items-center justify-center pt-5">
                    {
                      previewList?.map(url => (
                        <img src={url} className='mx-2' width={'70px'} height={'70px'} alt="" />
                      ))
                    }
                    {
                      previewList?.length < 3
                      && <label htmlFor="bookimg">
                        <input onChange={(e) => handleFileUpload(e)} type="file" id='bookimg' className='hidden' />
                        <FontAwesomeIcon icon={faPlus} className='ms-5 text-3xl' />

                      </label>}
                  </div>
                }




              </div>
            </div>
            <div className='flex items-center justify-end bg-gray-200 p-3'>
              <button className='py-2 px-3 rounded bg-gray-600 text-white' onClick={resetForm} >Reset</button>
              <button onClick={handleAddBook} className='py-2 px-3 rounded bg-blue-600 text-white ms-2'>Add</button>

            </div>

          </div>
        }
      </div>

      {/* book status */}
      {
        bookstatus &&
        <div className='p-10 my-2 shadow rounded'>

          {/* duplicate uploaded books */}
          {
            uploadedBooks?.length > 0 ?
              uploadedBooks?.map(bk => (
                <div className='p-5 rounded  mt-4 bg-gray-100'>
                  <div className='md:grid grid-cols-[3fr_1fr] items-center'>
                    <div className='px-4'>
                      <h1 className='text-2xl'>{bk?.title}</h1>
                      <h2 className='text-xl'>{bk?.author}</h2>
                      <h3 className='text-lg text-blue-600 '> {bk?.price}</h3>
                      <p className='text-justify mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam animi aut quos magni temporibus voluptas at, est fuga magnam facilis nihil itaque, recusandae iusto culpa rem sunt iste quisquam.</p>
                      <div className='flex mt-3'>
                        {
                          bk?.status == 'Pending' ?
                            <img width={'170px'} src="https://png.pngtree.com/png-clipart/20230806/original/pngtree-decision-pending-pending-award-order-vector-picture-image_9913728.png" alt="pending Icon" />
                            :
                            bk?.status == 'Approved' ?
                              <img width={'170px'} src="https://static.vecteezy.com/system/resources/previews/024/382/936/non_2x/approved-sign-with-checkmark-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png" alt="pending Icon" />
                              :
                              <img width={'170px'} src="https://png.pngtree.com/png-vector/20240331/ourmid/pngtree-sold-icon-design-vector-png-image_12250866.png" alt="pending Icon" />


                        }
                      </div>

                    </div>
                    <div className='px-4 mt-4 md:mt-0'>
                      <img src={bk?.imageUrl} height={'300px'} />
                      <div className='mt-4 flex justify-end'>
                        <button onClick={() => removeBook(bk?._id)} className='bg-red-700 text-white rounded p-2'>Delete</button>
                      </div>

                    </div>

                  </div>

                </div>
              ))
              :
              <p className='text-center my-5 text-red-600 font-bold'>No Books Uploaded Yet!</p>
          }




        </div>
      }

      {/* purchase history */}

      {
        purchasestatus &&
        <div className='p-10 my-2 shadow rounded'>


          {
            purchasededBooks?.length > 0 ?
              purchasededBooks?.map(bk => (
                <div className='p-5 rounded  mt-4 bg-gray-100'>
                  <div className='md:grid grid-cols-[3fr_1fr]'>
                    <div className='px-4'>
                      <h1 className='text-2xl'>{bk?.title}</h1>
                      <h2 className='text-xl'>{bk?.author}</h2>
                      <h3 className='text-lg text-blue-600 '> $ 300</h3>
                      <p className='text-justify'>{bk?.abstract}</p>
                      <div className='flex mt-3'>
                        <img width={'80px'} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="pending Icon" />

                      </div>

                    </div>
                    <div className='px-4 mt-4 md:mt-0'>
                      <img src={bk?.imageUrl} className='w-full' alt="" />


                    </div>

                  </div>

                </div>
              ))
              :
              <p>No Books purchased yet!</p>
          }





        </div>
      }

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />


    </>
  )
}

export default Profile