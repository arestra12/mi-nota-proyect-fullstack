import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { BottomNav } from '../BottomNav/BottomNav'
import "./Background.css"




export const Layout = ({ children }) => {
  return (
    <div className='app-layout'>

        {/* 👇 Fondo */}
        <div className='background-dots'></div>

        <Sidebar />

        <main className='main-content'>
            <div className='content-container'>
                {children}
            </div>
        </main>

        <BottomNav />

    </div>
  )
}