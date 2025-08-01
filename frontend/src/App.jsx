import NavBar from './components/NavBar';
import{ Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registrar from './pages/Registrar';

function App() {

  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registrar />} />
        </Routes>
      </div>
  
  )
}

export default App
