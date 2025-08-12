import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ReceitaDetalhe = () => {
  const [receita, setReceita] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const pegarReceita = async () => {
      const res = await axios.get(`/api/receitas/${id}`);
      setReceita(res.data);
    };
    pegarReceita();
  }, [id]);

  const navegar = useNavigate();

  const deletarReceita = async () => {
    try {
      await axios.delete(`/api/receitas/${id}`);
      navegar('/');
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
    }
  };

  if (!receita) return <div>Carregando...</div>;
  
  return (
    <div className='max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      {receita.fotoURL && (
              <img src={receita.fotoURL} alt={receita.nome} className="w-full h-96 object-cover rounded-lg mb-4" />
            )}
      <h1 className=' capitalize text-3xl font-bold mb-4'>{receita.nome}</h1>
      <p className='text-gray-600 mb-2'>Categoria: {receita.categoria}</p>
      <p className='text-gray-600 mb-2'>Tempo de preparo: {receita.tempoPreparo} minutos</p>
      <h2 className='text-xl font-semibold mb-2'>Ingredientes</h2>
      <ul className="pl-6 mb-4 list-disc">
        {receita.ingredientes.map((ingrediente, index) => (
          <li key={index} className='text-gray-700 mb-1'>{ingrediente}</li>
        ))}
      </ul>
      <h2 className='text-xl font-semibold mb-2'>Instruções</h2>
      <p className='text-gray-700 mb-4'>{receita.instrucoes}</p>
      {user && user._id === receita.criadoPor && (
        <div className='flex space-x-4'>
          <Link to={`/editar-receita/${id}`}>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Editar Receita</button>
          </Link>
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={deletarReceita}>Excluir Receita</button>
        </div>
      )}
    </div>
  )
}

export default ReceitaDetalhe