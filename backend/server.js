import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import receitasRoutes from './routes/receitas.js';

dotenv.config();

  //  "nome": "eliseu",
  //   "email": "eliseu@gmail.com",
  //   "senha": "543236"

const PORT = process.env.PORT || 2624;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/receitas', receitasRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
