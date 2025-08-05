import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Registrar = () => {
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const { registro } = useContext(AuthContext)
  const navegar = useNavigate()

  const lidarSubmit = async (e) => {
    e.preventDefault()
    try {
      await registro( user, email, senha )
      navegar('/')
    } catch (error) {
      console.error("Erro ao registrar:", error)
    }
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrar</h1>
      <form className="space-y-4" onSubmit={lidarSubmit}>
       <div>
          <label className="block text-gray-700">Usuário</label>
          <input 
            type="text" 
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border rounded p-2 w-full"
          />
       </div>
       <div>
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
          />
       </div>
       <div>
          <label className="block text-gray-700">Senha</label>
          <input 
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border rounded p-2 w-full"
          />
       </div>
       <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Registrar</button>
      </form>
    </div>
  )
}

export default Registrar