import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useFormulario } from '../../hooks/useForm'
import "./Form.css"
import { tasksStore } from '../../store/tasksStore';
import { toast } from 'react-toastify';



const Form = () => {

  const addTask = tasksStore(state => state.addTask)

  const { text, inputChange, inputReset } = useFormulario({ text: "" })

  const onSubmit = (e) => {


    e.preventDefault()

    if (!text.trim()) return
    if (text.length > 20) return


    const newTodo = {
      text: text
    }
    addTask(newTodo)
    inputReset()
    toast.success("Tarea agregada ✅");

  }





  return (


    <div className='div-form-task'>


      <div className='header-form'>
        <div className='headerform-1'>
          <h2>Guardar Tarea</h2>
        </div>
        <div className='headerform-2'>
          <h4>Descripción:</h4>
        </div>

      </div>

      <form onSubmit={onSubmit} action="" className='save-task-form'>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            name='text'
            onChange={inputChange}
            value={text}
            type="text"
            placeholder='➕ Agregar'
            className='form-control'
            maxLength={21}
            style={{ paddingRight: "60px" }} // espacio para el contador
          />

          <small
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: text.length > 20 ? "red" : "#999",
              fontWeight: text.length > 20 ? "bold" : "normal",
              fontSize: "12px",
              pointerEvents: "none" // importante
            }}
          >
            {text.length} / 20
          </small>
        </div>


        <div>
          <button className='btn btn-success'> Guardar  <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> </button>
        </div>

      </form>

    </div>

  )
}

export default Form