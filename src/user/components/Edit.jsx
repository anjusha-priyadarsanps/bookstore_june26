import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosinstance'
import { ToastContainer, toast } from 'react-toastify';
import { userUpdateAPI } from '../../services/allApi';
import { useNavigate } from 'react-router-dom';



function Edit() {
    const [modalStatus, setModalStatus] = useState(false)
    const [userDeatils, setUserDetils] = useState({ _id: "", username: "", password: "", cPassword: "", picture: "", bio: "" })
    const [existingPicture, setExistingPicture] = useState("")
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState(false)
    const [passwordMatch, setPasswordmatch] = useState(false)

    const navigate=useNavigate()



    useEffect(() => {

        if (sessionStorage.getItem("user")) {

            let user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetils({ ...userDeatils, _id: user._id, username: user.username, bio: user.bio })
            setExistingPicture(user.picture)


        }
    }, [])
    console.log(userDeatils);
    // console.log(existingPicture);

    const handleFileUpload = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile.type.startsWith("image/")) {
            setUserDetils({ ...userDeatils, picture: e.target.files[0] })
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageFile(true)

        }
        else {
            setImageFile(false)
        }

    }
    const checkPasswordMatch = (data) => {
        setUserDetils({ ...userDeatils, cPassword: data })
        userDeatils.password == data ? setPasswordmatch(true) : setPasswordmatch(false)


    }

    const resetProfileForm = () => {

        let user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetils({ ...userDeatils, _id: user._id, username: user.username, password: "", cPassword: "", picture: "", bio: user.bio })
        setExistingPicture(user.picture)

        setPreview("")
        setImageFile(false)
        setPasswordmatch(true)

    }

    const updateProfile = async () => {
        const { username, password, cPassword, bio } = userDeatils
        if (!username, !bio) {
            toast.warning("fill the fields completely")

        }
        else if (password && cPassword) {
            if (passwordMatch) {
                const reqbody = new FormData()
                for (let key in userDeatils) {
                    if (key != "picture") {
                        reqbody.append(key, userDeatils[key])
                    }
                    else {

                        preview ? reqbody.append(key, userDeatils[key]) : reqbody.append(key, existingPicture)

                    }
                }
                const result = await userUpdateAPI(userDeatils._id, reqbody)
                console.log(result);
                if (result.status == 200) {
                    toast.success("profile updated successfully")
                    setModalStatus(false)
                    navigate('/login')
                    sessionStorage.clear()

                }
            }

        }
        else {
            const reqbody = new FormData()

            for (let key in userDeatils) {
                if (key != "picture") {
                    reqbody.append(key, userDeatils[key])
                }
                else {
                    preview ? reqbody.append(key, userDeatils[key]) : reqbody.append(key, existingPicture)

                }
            }
            const result = await userUpdateAPI(userDeatils._id, reqbody)
            console.log(result);
            if (result.status == 200) {
                toast.success("profile updated successfully")
                setModalStatus(false)
                    navigate('/login')
                    sessionStorage.clear()

            }

        }

    }


    return (
        <>
            <button onClick={() => setModalStatus(true)} className='text-2xl text-blue-900'><FontAwesomeIcon icon={faPenToSquare} /></button>

            {/* modal */}
            {
                modalStatus &&
                <div className='relative z -10' >
                    <div className='bg-gray-500/75 fixed inset-0'>

                        <div className='flex justify-center items-center min-h-screen'>
                            <div style={{ height: '450px', width: '700px' }} className='bg-white rounded-2xl overflow-y-auto  md:w-250 w-100'>
                                {/* modal header */}
                                <div style={{ width: '700px' }} className='bg-black fixed z-10  text-white flex justify-between items-center p-2'>
                                    <h3>User Details</h3>
                                    <button onClick={() => setModalStatus(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                </div>
                                {/* modal body */}
                                <div className=' mt-10 bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4 relative p-5 overflow-y-auto'>


                                    <div className='rounded bg-blue-200 p-5 flex justify-center items-center flex-col'>
                                        <input onChange={e => handleFileUpload(e)} type="file" className='hidden' id='userPic' />

                                        <label htmlFor='userPic'>


                                            {
                                                existingPicture == "" ?
                                                    <img src={preview ? preview : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                                    :
                                                    existingPicture.startsWith('https://lh3.googleusercontent.com/') ?
                                                        <img src={preview ? preview : existingPicture} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                                        :

                                                        <img src={preview ? preview : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />


                                            }



                                        </label>
                                        <FontAwesomeIcon icon={faPen} className='bg-yellow-400 p-1 text-white' style={{ marginLeft: '50px', marginTop: '-25px' }} />

                                        {
                                            !imageFile &&
                                            <div className='mt-5 text-red-400 text-sm'>
                                                *Only uploads image file
                                            </div>
                                        }
                                        <div className='w-full mt-3'>
                                            <input value={userDeatils.username} onChange={(e) => setUserDetils({ ...userDeatils, username: e.target.value })} type="text" placeholder='User Name' className='bg-white p-2 w-full rounded' />
                                        </div>
                                        <div className='w-full mt-3'>
                                            <input onChange={(e) => setUserDetils({ ...userDeatils, password: e.target.value })} value={userDeatils.password} type="password" placeholder='New Password' className='bg-white p-2 w-full rounded' />
                                        </div>
                                        <div className='w-full mt-3'>
                                            <input onChange={(e) => checkPasswordMatch(e.target.value)} value={userDeatils.cPassword} type="password" placeholder='Confirm Pasword ' className='bg-white p-2 w-full rounded' />
                                        </div>
                                        {
                                            !passwordMatch &&
                                            <div className='mt-5 text-red-400 text-sm'>
                                                *Password and confirm password must be same
                                            </div>
                                        }
                                        <div className='w-full mt-3'>
                                            <textarea onChange={(e) => setUserDetils({ ...userDeatils, bio: e.target.value })} value={userDeatils.bio} name="" id="" placeholder='Bio' className='w-full p-2  rounded bg-white placeholder-gray-600 text-black'></textarea>
                                        </div>

                                    </div>


                                </div>
                                {/* modal footer */}
                                <div className='bg-gray-200 p-3 w-full flex justify-end'>
                                    <button type='button' onClick={resetProfileForm} className='py-2 px-3 rounded bg-yellow-600 text-white' >Reset</button>
                                    <button onClick={updateProfile} className='py-2 px-3 rounded bg-green-600 text-white ms-3'>Update</button>

                                </div>


                            </div>
                        </div>


                    </div>

                </div>
            }

            <ToastContainer position='top-center' theme='colored' autoClose={3000} />

        </>
    )
}

export default Edit