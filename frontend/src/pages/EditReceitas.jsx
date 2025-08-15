import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EditReceitas = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: '',
    ingredientes: [''],
    instrucoes: '',
    categoria: '',
    fotoURL: '',
    tempoPreparo: '',
  });
   const [error, setError] = useState("");
   const [carregar, setCarregar] = useState(false);
   const navegar = useNavigate();

     const lidarInputMudança = (field, value) => {
       setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const lidarIngredienteMudança = (index, value) => {
    const novosIngredientes = [...formData.ingredientes];
    novosIngredientes[index] = value;
    lidarInputMudança("ingredientes", novosIngredientes);
    const ultimoIngrediente =
      formData.ingredientes[formData.ingredientes.length - 1];
    if (error && ultimoIngrediente.trim() !== "") {
      setError("");
    }
  };

    const addIngrediente = () => {
    const ultimoIngrediente =
      formData.ingredientes[formData.ingredientes.length - 1];
    if (ultimoIngrediente.trim() !== "") {
      setError("");
      lidarInputMudança("ingredientes", [...formData.ingredientes, ""]);
    } else {
      setError("Por favor, coloque o último ingrediente antes de adicionar outro.");
    }
  };

  const removerIngrediente = (index) => {
    if (formData.ingredientes.length > 1) {
      const novosIngredientes = formData.ingredientes.filter((_, i) => i !== index);
      lidarInputMudança("ingredientes", novosIngredientes);
      const ultimoIngrediente =
        formData.ingredientes[formData.ingredientes.length - 1];
      if (error && ultimoIngrediente.trim() !== "") {
        setError("");
      }
    }
  };

   const lidarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCarregar(true);
    
   try {
     await axios.put(`/api/receitas/${id}`, {
       nome: formData.nome,
       ingredientes: formData.ingredientes.filter((i) => i.trim() !== ""),
       instrucoes: formData.instrucoes,
       categoria: formData.categoria,
       fotoURL: formData.fotoURL,
       tempoPreparo: formData.tempoPreparo ? Number(formData.tempoPreparo) : undefined,
     });

     navegar("/");
   } catch (error) {
     setError("Erro ao criar receita");
     console.log(error);
   } finally {
     setCarregar(false);
   }
   };

   useEffect(() => {
    const pegarReceita = async () => {
      const res = await axios.get(`/api/receitas/${id}`);
      setFormData({
        nome: res.data.nome,
        ingredientes: res.data.ingredientes,
        instrucoes: res.data.instrucoes,
        categoria: res.data.categoria,
        fotoURL: res.data.fotoURL,
        tempoPreparo: res.data.tempoPreparo,
      });
    };
    pegarReceita();
  }, [id]);

  if (!formData) return <div>Carregando...</div>;

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Editare Receita</h1>
      <form onSubmit={lidarSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => lidarInputMudança('nome', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Ingredientes</label>
          {formData.ingredientes.map((ingrediente, index) => (
            <div key={index} >
              <input
                type="text"
                value={ingrediente}
                onChange={(e) => {
                  lidarIngredienteMudança(index, e.target.value);
                }}
                className="w-full p-2 border rounded"
                 placeholder={`Ingrediente ${index + 1}`}
                required
              />
              {formData.ingredientes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerIngrediente(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          <button 
          type="button" 
          className="text-blue-500 hover:underline"
          onClick={addIngrediente}>
            Adicionar Ingrediente
          </button>
        </div>
        
        <div>
          <label className="block text-gray-700">Instruções</label>
          <textarea
            value={formData.instrucoes}
            onChange={(e) => lidarInputMudança('instrucoes', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Categoria</label>
          <select
            value={formData.categoria}
            onChange={(e) => lidarInputMudança('categoria', e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled >Selecione uma Categoria</option>
            <option value="Café da manhã">Café da Manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Jantar">Jantar</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Lanche">Lanche</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Tempo de Preparo (minutos)</label>
          <input
            type="number"
            value={formData.tempoPreparo}
            onChange={(e) => lidarInputMudança('tempoPreparo', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 30"
            min={0}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Foto URL</label>
          <input
            type="text"
            value={formData.fotoURL}
            onChange={(e) => lidarInputMudança('fotoURL', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="URL"
          />
        </div>
        <button className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            carregar ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={carregar}
          type="submit"
        >
          {carregar ? "Atualizando..." : "Atualizar Receita"}
        </button>
      </form>
    </div>
  )
}

export default EditReceitas