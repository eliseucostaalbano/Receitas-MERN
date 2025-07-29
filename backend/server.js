import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Servidor pronto!');
});

app.listen(2124, () => { 
  console.log('Servidor rodando em http://localhost:2124');
});
