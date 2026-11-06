import apiService from "../api/apiService";

// register api
export const registerAPI = async (userData) => {

  return await apiService('POST', '/register', userData)

}
// login api
export const loginAPI = async (userData) => {

  return await apiService('POST', '/login', userData)

}
// login api
export const googleloginAPI = async (userData) => {

  return await apiService('POST', '/google-login', userData)

}
// user profile edit api
export const userUpdateAPI = async (userId, userData) => {

  return await apiService('PUT', `/user/edit/${userId}`, userData)

}
// add book api
export const addBookAPI = async (bookDetails) => {

  return await apiService('POST', '/add-book', bookDetails)

}
// get homebooks api
export const getHomeBookAPI = async () => {

  return await apiService('GET', `/homebooks`, {})

}
// get homebooks api
export const getBooksAPI = async (searchKey) => {

  return await apiService('GET', `/all-books?search=${searchKey}`, {})

}
// get user-books api
export const getUserBooksAPI = async () => {

  return await apiService('GET', '/user-books', {})

}
// get bought-books api
export const getBoughtBooksAPI = async () => {

  return await apiService('GET', '/bought-books', {})

}
// single-book/:id
export const getSingleBookAPI = async (id) => {

  return await apiService('GET', `/single-book/${id}`, {})

}
// remove-book
export const removeBookAPI = async (id) => {

  return await apiService('DELETE', `/remove-book/${id}`, {})

}
// PAymeNt API
export const paymentkAPI = async (id) => {

  return await apiService('GET', `/make-payment/${id}`, {})

}
export const verifypaymentAPI = async (reqBody) => {

  return await apiService('POST', `/verify-payment`, reqBody)

}
// get adminbooks api
export const BooksAPI = async () => {

  return await apiService('GET', `/books`, {})

}
// book-update/6adc3a8c9d91ada8c2fab630
export const editBookStatusAPI = async (id) => {

  return await apiService('PUT', `/book-update/${id}`, {})

}
// get all uers api
export const getUserAPI = async () => {

  return await apiService('GET', `/all-users`, {})

}
// get abstract of book API

export const getAbstractAPI = async (title) => {

  return await apiService('POST', `/books-ai`, {title})

}
