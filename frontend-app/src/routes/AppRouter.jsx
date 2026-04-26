import { Route, Routes } from "react-router-dom"

import { NotasPage } from "../pages/NotasPage"
import { NotaPage } from "../pages/NotaPage"
import { TareasPage } from "../pages/TareasPage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { ConfiguracionPage } from "../pages/ConfiguracionPage"

import { ProtectedRoute } from "./ProtectedRoute"

const AppRouter = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TareasPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tareas"
        element={
          <ProtectedRoute>
            <TareasPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/configuracion"
        element={
          <ProtectedRoute>
            <ConfiguracionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notas"
        element={
          <ProtectedRoute>
            <NotasPage />
          </ProtectedRoute>
        }
      >
        <Route path=":id" element={<NotaPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default AppRouter