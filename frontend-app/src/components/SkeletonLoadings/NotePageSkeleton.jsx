import React from 'react'
import './NotePageSkeleton.css'

export const NotePageSkeleton = () => {
  return (
    <div className="note-skeleton">

      <div className="skeleton skeleton-title"></div>

      <div className="note-skeleton-grid">

        <div className="skeleton skeleton-image"></div>

        <div>
          <div className="skeleton skeleton-card"></div>

          <div className="skeleton-tags">
            <div className="skeleton skeleton-tag"></div>
            <div className="skeleton skeleton-tag"></div>
            <div className="skeleton skeleton-tag"></div>
          </div>
        </div>

        <div>
          <div className="skeleton skeleton-meta"></div>
          <div className="skeleton skeleton-meta small"></div>
        </div>

      </div>

      <div className="skeleton skeleton-button"></div>

    </div>
  )
}