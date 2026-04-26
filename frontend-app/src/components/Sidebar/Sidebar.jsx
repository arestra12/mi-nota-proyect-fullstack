import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { dataSidebar } from '../../utils/dataUtil'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.css"


import { useUser, useClerk } from "@clerk/clerk-react"


export const Sidebar = () => {

  // usuario de clerk
  const { user } = useUser()


  const { signOut } = useClerk()


  // 🔴 Placeholder para lógica futura
  const handleLogout = () => {
    // TODO: aquí irá la lógica de cerrar sesión
    signOut()
  }

  return (
    <aside className='sidebar'>

      {/* HEADER */}
      <div className='sidebar-header'>
        <div className="logo">
          <svg
            className='app-logo'
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M0 0 H64 V12 A20 20 0 0 0 64 52V64 H0 Z"
              fill="#111"
              stroke="#0998c4"
              strokeWidth="2"
            />

            <rect x="10" y="18" width="24" height="3" rx="1.5" fill="#4ADE80" />
            <rect x="10" y="26" width="20" height="3" rx="1.5" fill="#4ADE80" opacity="0.7" />
            <rect x="10" y="34" width="16" height="3" rx="1.5" fill="#4ADE80" opacity="0.5" />

            <path
              d="M28 44L32 48L40 38"
              stroke="#4ADE80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="46" cy="22" r="6" fill="#0998c4" opacity="0.6" />
          </svg>

          <h1 className='sidebar-title'>Mi-Nota</h1>
        </div>
      </div>

      {/* NAV */}
      <nav className='sidebar-nav'>
        {
          dataSidebar.map(side => (
            <NavLink
              key={side.id}
              to={side.link}
              className={({ isActive }) =>
                isActive ? `sidebar-item active` : `sidebar-item`
              }
            >
              <FontAwesomeIcon icon={side.icon} className='fa-icon' />
              <span>{side.title}</span>
            </NavLink>
          ))
        }
      </nav>

      {/* FOOTER COMPLETO */}
      <div className='sidebar-footer'>

        {/* USER */}
        <div className="user-info">
          <div className="avatar">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="avatar" />
            ) : (
              <span>U</span>
            )}
          </div>

          <div className="user-text">
            <p className="user-name" title={user?.fullName}>
              {user?.fullName || "Usuario"}
            </p>


            <p className="user-plan" title={user?.primaryEmailAddress?.emailAddress}>
              {user?.primaryEmailAddress?.emailAddress}
            </p>

          </div>
        </div>

        {/* LOGOUT */}
        <button className='logout-btn' onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Cerrar sesión</span>
        </button>

      </div>

    </aside>
  )
}