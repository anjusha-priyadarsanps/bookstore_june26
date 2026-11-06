
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './user/pages/Home'
import { useContext, useEffect, useState } from 'react'
import Preloeader from './components/Preloeader'
import Auth from './pages/Auth'
import AllBokks from './user/pages/AllBokks'
import Contact from './user/pages/Contact'
import Profile from './user/pages/Profile'
import ViewBook from './user/pages/ViewBook'
import Dashboard from './admin/pages/Dashboard'
import Settings from './admin/pages/Settings'
import Resource from './admin/pages/Resource'
import Pnf from './pages/Pnf'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFail from './user/pages/PaymentFail'
import { routerContext } from './context/RouterGuardContext'


function App() {
  const {role}=useContext(routerContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {

    setTimeout(() => {

      setLoading(false)
    }, 5000);

  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={loading ? <Preloeader /> : <Home />} />
        <Route path='/login' element={ <Auth />} />
        <Route path='/signup' element={ <Auth register />} />
        <Route path='/all-books' element={ <AllBokks />} />
        <Route path='/contact' element={ <Contact />} />
      {
        role=='user' &&
        <>
          <Route path='/profile/:id' element={ <Profile />} />
          <Route path='/view/:id/book' element={ <ViewBook />} />
          <Route path='/success' element={ <PaymentSuccess />} />
          <Route path='/cancel' element={ <PaymentFail />} />
        </ >
        
        }

       {
        role=='admin' &&
        <>
          <Route path='/admin-dashboard' element={ <Dashboard />} />
          <Route path='/admin-resources' element={ <Resource />} />
          <Route path='/admin-settings' element={ <Settings />} />
          
        </>
        }
        <Route path='/*' element={ <Pnf />} />




      </Routes>
      <Footer />
    </>
  )
}

export default App
