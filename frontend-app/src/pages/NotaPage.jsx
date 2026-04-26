import React, { useEffect, useState } from 'react'
import { Nota } from '../components/Notas/Nota'
import Title from '../components/Title/Title'
import { notesStore } from '../store/notesStore'
import { imagesStore } from '../store/imagesStore'
import { useNavigate, useParams } from 'react-router-dom'
import "./NotaPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBackward, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { NotePageSkeleton } from '../components/SkeletonLoadings/NotePageSkeleton'

export const NotaPage = () => {

  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const {
    note,
    fetchNote,
    updateNote,
    clearNote,
    error,
    deleteNote,
    loading
  } = notesStore()

  const images = imagesStore(state => state.images)

  // 🔄 FETCH
  useEffect(() => {
    clearNote()
    fetchNote(id)
  }, [id])

  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)

    return date.toLocaleDateString('es-SV', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const petImage = images.find(img => img.id === note?.pet)

  const handleDelete = async () => {
    if (!note?.id) return
    await deleteNote(note.id)
    navigate(-1)
  }

  return (
    <section className="note-tab">

      {/* HEADER */}
      <div className='header-note-1'>
        <Title title="Nota" />
      </div>

      <div className='header-note-2'>
        <button className='btn btn-back' onClick={() => navigate(-1)} >
          <FontAwesomeIcon icon={faBackward} /> Regresar
        </button>
      </div>

      <div className='header-note-3'>
        <button
          className='btn btn-warning'
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancelar" : "Editar"}
          {!isEdit && <FontAwesomeIcon icon={faEdit} />}
        </button>
      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <NotePageSkeleton />
      )}

      {/* ❌ ERROR */}
      {!loading && error && (
        <p className="error-text">
          Error al cargar la nota
        </p>
      )}

      {/* 📝 EDIT */}
      {!loading && !error && isEdit && note && (
        <Nota {...{
          note,
          fetchNote,
          updateNote,
          clearNote,
          error,
          setIsEdit
        }} />
      )}

      {/* 👀 VIEW */}
      {!loading && !error && !isEdit && note && (

        <div className="note-layout">

          <h1 className="note-main-title">
            {note.title}
          </h1>

          <div className="note-grid">

            {/* LEFT IMAGE */}
            <div className="note-side left">
              {petImage && (
                <div
                  className="note-image"
                  style={{ backgroundImage: `url(${petImage.url1})` }}
                />
              )}
            </div>

            {/* CENTER CONTENT */}
            <div className="note-center">

              <div className="note-content-card">
                <p>{note.content}</p>
              </div>

              {note.tags?.length > 0 && (
                <div className="note-tags">
                  {note.tags.map(tag => (
                    <span key={tag} className="note-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* RIGHT META */}
            <div className="note-side right">

              <div className="note-meta-box">
                <span className="note-date">
                  {formatDate(note.createdAt)}
                </span>

                {note.pinned && (
                  <span className="note-pinned">
                    <FontAwesomeIcon
                      className='pin-icon-note'
                      icon={faThumbtack}
                    />
                    Fijada
                  </span>
                )}
              </div>

            </div>

            {/* DELETE */}
            <button
              className='btn btn-danger'
              onClick={handleDelete}
            >
              Eliminar Nota
            </button>

          </div>

        </div>
      )}

    </section>
  )
}