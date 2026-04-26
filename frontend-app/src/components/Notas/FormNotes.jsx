import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useFormulario } from '../../hooks/useForm'

import { notesStore } from '../../store/notesStore'
import { imagesStore } from '../../store/imagesStore'

import "./FormNotes.css"
import { useState } from 'react'

const FormNotes = ({ initialData = {}, onSubmitCustom, buttonChange, onClose }) => {


  const [petError, setPetError] = useState("")



  const addNote = notesStore(state => state.addNote)

  // 🔥 mascotas desde zustand
  const images = imagesStore(state => state.images)


  const { title, content, pinned, tags, pet, inputChange, inputReset } = useFormulario({ title: initialData.title || "", content: initialData.content || "", pinned: initialData.pinned || false, tags: initialData.tags?.join(", ") || "", pet: initialData.pet || "" })
  //const { title, content, pinned, tags, pet, inputChange, inputReset } =useFormulario({title: "",content: "",pinned: false,tags: "",pet: ""})
  //tags: initialData.tags?.join(", ") || ""

  // 🔥 NUEVO: validación global del form
  const isInvalid = !title.trim() || !content.trim()

  /*
  useEffect(() => {
  inputChange({
    target: { name: "title", value: initialData.title || "" }
  })
  inputChange({
    target: { name: "content", value: initialData.content || "" }
  })
  inputChange({
    target: { name: "pinned", value: initialData.pinned || false }
  })
  inputChange({
    target: { name: "tags", value: initialData.tags?.join(", ") || "" }
  })
  inputChange({
    target: { name: "pet", value: initialData.pet || "" }
  })
}, [initialData])
  
  */



  // 🔹 submit
  const onSubmit = (e) => {
    e.preventDefault()
    if (title.length > 15) return

    // 🔥 VALIDACIÓN PRINCIPAL
    if (!title.trim() || !content.trim()) {
      return
    }

    if (!pet) {
      setPetError("Selecciona una mascota antes de guardar")
      return
    } // 🔥 validación

    setPetError("")

    const noteData = {
      title,
      content,
      pinned,
      tags: tags.split(",").map(t => t.trim()),
      pet // ID
    }

    // 🔥 aquí decides si crear o editar
    if (onSubmitCustom) {
      const id = initialData.id

      const updateData = { id, ...noteData }


      onSubmitCustom(updateData)
      if (buttonChange) {
        buttonChange(prev => !prev)
      }
    } else {
      addNote(noteData)
      inputReset()
      onClose?.()
    }


  }

  return (
    <div className='div-form-notes'>

      <div className='header-form-notes'>
        <div className='headerform-notes-1'>
          <h2>Editar Nota</h2>
        </div>


      </div>

      <form onSubmit={onSubmit} className="form-notes">

        {/* TITLE */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            name="title"
            value={title}
            onChange={inputChange}
            placeholder="Título"
            className='form-control'
            maxLength={16}
          />
          <small
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: title.length > 15 ? "red" : "#999",
              fontWeight: title.length > 15 ? "bold" : "normal",
              fontSize: "12px",
              pointerEvents: "none" // importante
            }}
          >
            {title.length} / 15
          </small>
        </div>

        {/* CONTENT */}
        <textarea
          name="content"
          value={content}
          onChange={inputChange}
          placeholder="Contenido"
          className='form-control textarea'
        />

        {/* PINNED */}
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="pinned"
            checked={pinned}
            onChange={inputChange}
          />
          Fijar nota
        </label>

        {/* TAGS */}
        <input
          name="tags"
          value={tags}
          onChange={inputChange}
          placeholder="tags separados por coma"
          className='form-control'
        />

        {/* 🔥 MASCOTAS */}
        <div className="pets-container">
          {images.map(img => (
            <img key={img.id} src={img.url1} alt={img.name} onClick={() => inputChange({ target: { name: "pet", value: img.id } })} className={`pet-item ${pet === img.id ? "active" : ""}`} />
          ))}
        </div>

        {petError && (
          <small style={{ color: "red", marginTop: "5px", display: "block" }}>
            {petError}
          </small>
        )}

        {/* BOTÓN */}
        <div>
          <button
            className="btn btn-success"
            disabled={isInvalid}
          >
            Guardar <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </div>

      </form>
    </div>
  )
}

export default FormNotes