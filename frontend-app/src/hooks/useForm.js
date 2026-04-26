import { useState } from "react"

export const useFormulario = (initialForm) => {
  const [formState, setFormState] = useState(initialForm)

  const inputChange = ({ target }) => {
    const { name, type, value, checked } = target

    setFormState({ ...formState, [name]: type === "checkbox" ? checked : value }) }

  const inputReset = () => {
    setFormState(initialForm)
  }

  return { ...formState, formState, inputChange, inputReset }
}

















