import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/home/Homepage'
import Navbar from '../components/layouts/navbar/Navbar'

const IndexRoute = () => {
  return (
    <BrowserRouter>
       <nav>
        <Navbar />
       </nav>

       <Routes>
        <Route path="/" element={<Homepage/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default IndexRoute;