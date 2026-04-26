import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import FormNotes from './FormNotes'

export const Nota = ({ note, updateNote,error, setIsEdit}) => {

  if(error) return(<Navigate to="/404"></Navigate>)

 const handleUpdate = (data) => {
    updateNote(data)
  }

  return (
    <div>

      <FormNotes
        initialData={note}
        onSubmitCustom={handleUpdate}
        buttonChange={setIsEdit}
      />
    </div>
  )
}
