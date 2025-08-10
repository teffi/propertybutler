// import { useState } from 'react'
import { useEffect, useState } from 'react'
import './index.css'
import PropertiesPage from './properties/PropertiesPage'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage';
import PropertyDetail from './properties/PropertyDetail';


function App() {
  return (
    <>
      <BrowserRouter>
        <header className='flex flex-row gap-12 p-8'>
          <NavLink to="/" className="text-md">
            Home
          </NavLink>

          <NavLink to="/properties" className="text-md">
            Properties
          </NavLink>
        </header>
        <div className="bg-slate-200 w-full min-h-screen py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App
