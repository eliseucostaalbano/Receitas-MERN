import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { proteger } from '../middleware/auth.js';

const router = express.Router();

//Registar um novo usuário
router.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if(!nome || !email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }
    const user = await User.create({ nome, email, senha });
    const token = generateToken(user._id);
    res.status(201).json({
        _id : user._id,
        nome: user.nome,
        email: user.email,
        token,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

//Login do usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.compareSenha(senha))) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }
        const token = generateToken(user._id);
        res.json({
            _id: user._id,
            nome: user.nome,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
})

router.get('/me', proteger, async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default router;