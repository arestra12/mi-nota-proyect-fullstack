import React from 'react'
import { Configuracion } from '../components/Configuracion/Configuracion'
import Title from '../components/Title/Title'
import "./ConfiguracionPage.css"
export const ConfiguracionPage = () => {
  return (

    <section className="tasks-config">

      <Title title="Configuración" />
      <Configuracion></Configuracion>
    </section>

  )
}
