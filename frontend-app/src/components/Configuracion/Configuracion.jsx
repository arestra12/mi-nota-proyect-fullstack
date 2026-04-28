import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import "./Configuracion.css";
import { Modal } from "../Modals/Modal";
import { toast } from "react-toastify";

export const Configuracion = () => {
  const { user, isLoaded } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [name, setName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // 🔥 PRECARGAR NOMBRE DEL USUARIO
  useEffect(() => {
    if (user) {
      setName(user.firstName || "");
    }
  }, [user]);


  if (!isLoaded) return <p>Cargando...</p>;

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.warning("El nombre no puede estar vacío ⚠️");
      return;
    }

    try {
      await user.update({
        firstName: name,
      });
      toast.success("Nombre actualizado ✏️");
    } catch (error) {
      console.error(error);
    }
  };



  // 🔥 ELIMINAR CUENTA
  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      setOpenDeleteModal(false);
    } catch (error) {

      // 👇 guardar intención
      localStorage.setItem("delete_intent", "true");

      // 👇 cerrar sesión
      await signOut();

      // 👇 ahora sí abrir modal (ya no hay sesión)
      openSignIn();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatarPerfil">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="avatar" />
          ) : (
            <span>{user.fullName?.charAt(0)}</span>
          )}
        </div>

        <h2>{user.fullName}</h2>
        <p>{user.primaryEmailAddress?.emailAddress}</p>
      </div>

      <div className="profile-form">
        <h3>Detalles del Perfil</h3>

        <label>Nombre completo</label>
        <input
          type="text"
          placeholder="Actualiza tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />

        <div className="actions">
          <button onClick={handleUpdate} className="btn btn-success btn-perfil">
            Guardar cambios
          </button>

          <button
            onClick={() => setOpenDeleteModal(true)}
            className="btn btn-danger"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>



      {openDeleteModal && (
        <Modal onClose={() => setOpenDeleteModal(false)}>
          <div className="delete-modal-container">
            <h3 className="delete-title">¿Eliminar cuenta?</h3>
            <p className="delete-text">
              Esta acción es permanente y no se puede deshacer.
            </p>

            <div className="delete-actions">
              <button
                className="btn btn-danger"
                onClick={handleDeleteAccount}
              >
                Sí, eliminar
              </button>

              <button
                className="delete-cancel-btn"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};