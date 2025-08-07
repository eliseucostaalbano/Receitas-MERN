import  { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  const navegar = useNavigate();

  const lidarLogout = () => {
    logout();
    navegar('/login');
  }

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <h1>Receitas</h1>
        </Link>
        <div className="flex gap-x-4">
          {user ? (
            <div className="flex gap-x-4">
              <Link to="/nova-receita">
                <button className="text-gray-600 hover:text-gray-800">Nova Receita</button>
              </Link>
              <button onClick={lidarLogout}  className="text-gray-600 hover:text-gray-800">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/registro">
                <button>Registrar</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar