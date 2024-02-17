import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from "react-router-dom"
const Layout = () => {
  const [path,setPath]=React.useState("")
  useEffect(()=>{
    const location = window.location.pathname
    setPath(location)
  },[path])

  return (
    <div>
    {path !== '/register' &&  path !== '/login' && <Header />}
    <Outlet/> 
     {/* my all content comes into outlet */}
     {path !== '/register' &&  path !== '/login' && <Footer/> }
         
    </div>
  )
}

export default Layout
