import React from 'react'
import { NavLink } from 'react-router-dom'
import { dataSidebar } from '../../utils/dataUtil'
import "./BottomNav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { useClerk } from "@clerk/clerk-react"

export const BottomNav = () => {
  

  const { signOut } = useClerk()

  
  // 🔴 Placeholder para lógica futura
  const handleLogout = () => {
    // TODO: aquí irá la lógica de cerrar sesión
     signOut()
  }

  return (
    <nav className='bottom'>





      <div className='bottom-nav'>

        {
          dataSidebar.map(bottom=>(

        <NavLink key={bottom.id} to={bottom.link} className={({isActive})=>isActive?`bottom-item active`:`bottom-item`}>
          <FontAwesomeIcon icon={bottom.icon}></FontAwesomeIcon>
          <span>{bottom.title}</span>
        </NavLink>

          ))
        }


      </div>


      {/* FOOTER COMPLETO */}
            <div className='bottom-logout'>
      
              {/* LOGOUT */}
              <button className='bottom-logout-btn' onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Cerrar sesión</span>
              </button>
      
            </div>


    </nav>
  )
}
