import NavBar from './components/Navbar';
import{ Routes , Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import AddReceita from './pages/AddReceita';

function App() {

  return (
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registrar />} />
          <Route path="/nova-receita" element={<AddReceita />} />
        </Routes>
      </AuthProvider>
  )
}

export default App

