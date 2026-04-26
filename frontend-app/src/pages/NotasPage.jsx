import React, { useEffect, useState } from 'react'
import { Notas } from '../components/Notas/Notas'
import Title from '../components/Title/Title'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { notesStore } from '../store/notesStore'
import { imagesStore } from '../store/imagesStore'
import "./NotasPage.css"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/clerk-react"
import FormNotes from '../components/Notas/FormNotes'
import { ModalNotes } from '../components/Modals/ModalNotes'

export const NotasPage = () => {

  const [openModal, setOpenModal] = useState(false)

  const { notes, fetchNotes, loading, updateNote, hasMore } = notesStore()
  const images = imagesStore(state => state.images)

  const { isLoaded, isSignedIn } = useAuth()

  // ✅ FETCH INICIAL (sin token manual)
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    fetchNotes()
  }, [isLoaded, isSignedIn])

  const [searchParams, setSearchParams] = useSearchParams()

  const obtenerEstado = searchParams.get("state") === "true" ? true : false

  const notesFilterPinned = obtenerEstado
    ? notes.filter(n => n.pinned === true)
    : notes

  const setEstado = () => {
    const newEstado = !obtenerEstado

    const setear = new URLSearchParams(searchParams)
    setear.set("state", newEstado.toString())

    setSearchParams(setear)
  }

  const props = {
    notesFilterPinned,
    images,
    loading,
    fetchNotes, // 🔥 ya limpio
    updateNote,
    hasMore
  }

  const { id } = useParams()

  // 🔥 Vista detalle
  if (id) {
    return <Outlet />
  }

  // 🔥 Vista lista
  return (
    <section className="notes-tab">

      <Title title="Notas" />

      <div className='notes-header'>
        <button
          className="btn btn-success"
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button className='btn btn-filter' onClick={setEstado}>
          {obtenerEstado ? "solo Fijadas" : "Todas"}
        </button>
      </div>

      <div className='notes-list'>
        <Notas {...props} />
      </div>

      {/* MODAL */}
      {
        openModal && (
          <ModalNotes onClose={() => setOpenModal(false)}>

             <FormNotes onClose={() => setOpenModal(false)} />

          </ModalNotes>
        )
      }

    </section>
  )
}