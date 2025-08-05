import NavBar from './components/NavBar';
import{ Routes , Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Registrar from './pages/Registrar';

function App() {

  return (
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registrar />} />
        </Routes>
      </AuthProvider>
  )
}

export default App

