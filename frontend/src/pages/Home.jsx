import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [receitas, setReceitas] = useState([]);
  const [categoria, setCategoria] = useState("geral");

  const categorias = [
    "geral",
    "café da manhã",
    "almoço",
    "jantar",
    "sobremesa",
    "lanche",
  ];

  useEffect(() => {
    const PegarReceitas = async () => {
      const res = await axios.get(`/api/receitas/${categoria && categoria !== "geral" ?  `?categoria=${categoria}` : ""}`);
      console.log(res.data);
      setReceitas(res.data);
    };
    PegarReceitas();
  }, [categoria]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoria === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitas.map((receita) => (
          <Link
            to={`/receitas/${receita._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg duration-300 cursor-pointer"
            key={receita._id}
          >
            {receita.fotoURL && (
              <img src={receita.fotoURL} alt={receita.nome} className="w-full h-48 object-cover" />
            )}
            <h2 className="text-xl font-semibold capitalize">{receita.nome}</h2>
            <p className="text-gray-600">{receita.categoria}</p>
            <p className="text-gray-600">{receita.tempoPreparo} minutos</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
