import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const DeleteAccountHandler = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const intent = localStorage.getItem("delete_intent");

    if (!intent || !user) return;

    const deleteAccount = async () => {
      try {
        await user.delete();
        localStorage.removeItem("delete_intent");

        alert("Cuenta eliminada correctamente");
      } catch (error) {
        console.error("Error eliminando después de login:", error);
      }
    };

    if (isLoaded) {
      deleteAccount();
    }
  }, [isLoaded, user]);

  return null;
};