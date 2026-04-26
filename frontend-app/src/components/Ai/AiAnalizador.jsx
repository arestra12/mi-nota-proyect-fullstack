import { useAi } from '../../hooks/useAi'

export const AiAnalizador = ({id}) => {

    const {loading,error, summary,  fetchSummary}=useAi(id)






  if(summary.length >0){

    return(<h3>{summary}</h3>)
  }

  return (


    <button    onClick={fetchSummary} > {loading? "Generando saludo...":"Generar saludo"}  </button>
  )



}
