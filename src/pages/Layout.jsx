import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/NavBar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
