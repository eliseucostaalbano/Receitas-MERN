
import { useParams } from 'react-router-dom';

const ReceitaDetalhe = () => {
   const { id } = useParams();
  return (
    <div>ReceitaDetalhe {id}</div>
  )
}

export default ReceitaDetalhe