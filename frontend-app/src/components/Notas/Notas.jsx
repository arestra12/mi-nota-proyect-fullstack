import React, { useEffect, useRef } from 'react'
import { notesStore } from '../../store/notesStore'
import { imagesStore } from '../../store/imagesStore'
import { Link } from 'react-router-dom'
import './Notas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faThumbtackSlash } from '@fortawesome/free-solid-svg-icons'

export const Notas = ({
  images,
  notesFilterPinned,
  fetchNotes,
  loading,
  updateNote
}) => {

  const loaderRef = useRef(null)

  const pinnedChange = (e, n) => {
    e.preventDefault()
    e.stopPropagation()

    const updatePinned = {
      id: n.id,
      pinned: !n.pinned
    }
    updateNote(updatePinned)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchNotes()
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0
      }
    )

    const current = loaderRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loading, fetchNotes])

  return (
    <div className="container">

      <div className="grid">
        {notesFilterPinned.map((n) => {
          const petImage = images.find((img) => img.id === n.pet)

          return n.pinned ? (
            <Link
              key={n.id}
              to={`/notas/${n.id}`}
              className="note-card"
              style={{
                backgroundImage: petImage
                  ? `url(${petImage.url1})`
                  : 'none'
              }}
            >
              {/* ICONO */}
              <div
                className="pin-icon fijado"
                onClick={(e) => pinnedChange(e, n)}
              >
                <FontAwesomeIcon icon={faThumbtack} />
              </div>

              <span>{n.title}</span>
            </Link>
          ) : (
            <Link
              key={n.id}
              to={`/notas/${n.id}`}
              className="note-card"
              style={{
                backgroundImage: petImage
                  ? `url(${petImage.url2})`
                  : 'none'
              }}
            >
              {/* ICONO */}
              <div
                className="pin-icon"
                onClick={(e) => pinnedChange(e, n)}
              >
                <FontAwesomeIcon icon={faThumbtackSlash} />
              </div>

              <span>{n.title}</span>
            </Link>
          )
        })}
      </div>

      <div ref={loaderRef} style={{ height: '40px' }} />

      {loading && <p>Cargando...</p>}
    </div>
  )
}