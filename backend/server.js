import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 2624;
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor pronto para receber requisições!');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
