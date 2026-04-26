import React from 'react'
import './NotePageSkeleton.css'

export const NotePageSkeleton = () => {
  return (
    <div className="note-skeleton">

      {/* HEADER TITLE */}
      <div className="skeleton skeleton-title"></div>

      {/* GRID */}
      <div className="note-skeleton-grid">

        {/* LEFT IMAGE */}
        <div className="skeleton skeleton-image"></div>

        {/* CENTER CONTENT */}
        <div className="note-skeleton-center">

          <div className="skeleton skeleton-card"></div>

          <div className="skeleton-tags">
            <div className="skeleton skeleton-tag"></div>
            <div className="skeleton skeleton-tag"></div>
            <div className="skeleton skeleton-tag"></div>
          </div>

        </div>

        {/* RIGHT META */}
        <div className="note-skeleton-right">

          <div className="skeleton skeleton-meta"></div>

          <div className="skeleton skeleton-meta small"></div>

        </div>

      </div>

      {/* BUTTON */}
      <div className="skeleton skeleton-button"></div>

    </div>
  )
}