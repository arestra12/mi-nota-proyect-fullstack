import React from 'react'
import "./Title.css"


const Title = ({title}) => {
  return (
    <>
    <div className='global-title'>
      <h1>{title || "Sin titulo"}</h1>
    </div>
    
    </>
  )
}

export default React.memo(Title)