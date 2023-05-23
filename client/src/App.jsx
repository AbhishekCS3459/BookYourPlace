// import { useState } from 'react'

import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true;
function App() {
  
  return (

    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/account" element={<ProfilePage/>} />
        <Route path="/account/places" element={<PlacesPage/>} />
        <Route path="/account/places/new" element={<PlacesFormPage/>} />
        <Route path="/account/places/:id" element={<PlacesFormPage/>} />
        {/* <Route path="/account/bookings" element={<PlacesFormPage/>} /> */}
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
