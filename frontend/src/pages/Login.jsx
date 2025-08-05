import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

 const { login } = useContext(AuthContext)
  const navegar = useNavigate()

  const lidarSubmit = async (e) => {
    e.preventDefault()
    try {
      await login( email, senha )
      navegar('/')
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={lidarSubmit}>
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
       <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Login</button>
      </form>
    </div>
  )
}

export default Login