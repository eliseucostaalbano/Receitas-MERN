import { useState } from 'react'

const AddReceita = () => {
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
   }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Nova Receita</h1>
      <form onSubmit={lidarSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Título</label>
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
            Criar Receita
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
            <option value="café da manhã">Café da Manhã</option>
            <option value="almoço">Almoço</option>
            <option value="jantar">Jantar</option>
            <option value="sobremesa">Sobremesa</option>
            <option value="lanche">Lanche</option>
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
          {carregar ? "Adicionando..." : "Adicionar Receita"}
        </button>
      </form>
    </div>
  )
}

export default AddReceita