import { createPortal } from "react-dom"

export const ModalNotes = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay-notes" onClick={onClose}>
      
      <div 
        className="modal-content-notes"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

    </div>,
    document.getElementById("modal-root")
  )
}