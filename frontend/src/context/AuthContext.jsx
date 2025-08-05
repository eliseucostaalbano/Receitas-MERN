import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get("/api/auth/me").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  const login = async (email, senha) => {
  const res = await axios.post("/api/auth/login", { email, senha });
  console.log(res.data);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser(res.data);
  };
  const registro = async (nome, email, senha) => {
    const res = await axios.post("/api/auth/registro", { nome, email, senha });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setUser(res.data);
    }

    const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{ user, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  )


};

