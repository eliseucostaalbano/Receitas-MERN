import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1>Receitas</h1>
        <div className="flex gap-x-4">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/registro">
            <button>Registrar</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar