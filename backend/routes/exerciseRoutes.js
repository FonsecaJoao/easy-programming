const express = require('express');
const router = express.Router();

/*
// Importe o modelo de dados do enunciado do exercício
const Enunciado = require('../models/enunciado');

// Rota para inserir o enunciado
router.post('/', async (req, res) => {
  try {
    // Recupere os dados do enunciado do exercício do corpo da requisição
    const { titulo, descricao } = req.body;

    // Crie uma instância do modelo de dados do enunciado
    const novoEnunciado = new Enunciado({
      titulo,
      descricao
    });

    // Salve o enunciado na base de dados
    const enunciadoSalvo = await novoEnunciado.save();

    // Responda com o enunciado salvo
    res.json(enunciadoSalvo);
  } catch (error) {
    console.error('Erro ao inserir o enunciado:', error);
    res.status(500).json({ error: 'Erro ao inserir o enunciado' });
  }
});

module.exports = router;
*/

router.post('/', (req, res) => {
  const { text_code, user_id } = req.body;

  const query = 'INSERT INTO exercise (text_code, user_id) VALUES (?, ?)';
  const values = [text_code, user_id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir o enunciado na base de dados:', error);
      res.status(500).json({ error: 'Erro ao inserir o enunciado' });
      return;
    }

    res.json({ success: true });
  });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM exercise';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao recuperar o enunciado da base de dados:', error);
      res.status(500).json({ error: 'Erro ao recuperar o enunciado' });
      return;
    }

    const exercise = results[0]; // Assumindo que há apenas um enunciado

    res.json(exercise);
  });
});

