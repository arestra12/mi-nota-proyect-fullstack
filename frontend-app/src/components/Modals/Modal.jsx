import { createPortal } from "react-dom"
import "./Modals.css"

export const Modal = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

    </div>,
    document.getElementById("modal-root")
  )
}