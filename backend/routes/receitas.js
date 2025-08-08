import express from "express";
import Receita from "../models/Receita.js";
import { proteger } from "../middleware/auth.js";

const router = express.Router();

//rota para mostrar todas as receitas
router.get("/", async (req, res) => {
  const { categoria } = req.query;
  try {
    const query = categoria ? { categoria } : {};
    const receitas = await Receita.find(query);
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar receitas" });
    console.log(error);
  }
});

//rota para mostrar uma receita específica
router.get("/:id", async (req, res) => {
  try {
    const receita = await Receita.findById(req.params.id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }
    res.json(receita);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar receita" });
    console.log(error);
  }
});

//rota para criar uma nova receita
router.post("/", proteger, async (req, res) => {
  const { nome, ingredientes, instrucoes, categoria, fotoURL, tempoPreparo } =
    req.body;
  try {
    if (
      !nome ||
      !ingredientes ||
      !instrucoes ||
      !categoria ||
      !fotoURL ||
      !tempoPreparo
    ) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const receita = await Receita.create({
      nome,
      ingredientes,
      instrucoes,
      categoria,
      fotoURL,
      tempoPreparo,
      criadoPor: req.user._id,
    });
    res.status(201).json(receita);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar receita" });
    console.log(error);
  }
});

//rota para atualizar uma receita
router.put("/:id", proteger, async (req, res) => {
  const { nome, ingredientes, instrucoes, categoria, fotoURL, tempoPreparo } =
    req.body;
  try {
    const receita = await Receita.findById(req.params.id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }
    // Verifica se o usuário é o criador da receita
    if (receita.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Acesso negado" });
    }
    // Atualiza os campos da receita
    receita.nome = nome || receita.nome;
    receita.ingredientes = ingredientes || receita.ingredientes;
    receita.instrucoes = instrucoes || receita.instrucoes;
    receita.categoria = categoria || receita.categoria;
    receita.fotoURL = fotoURL || receita.fotoURL;
    receita.tempoPreparo = tempoPreparo || receita.tempoPreparo;

    const receitaAtualizada = await receita.save();
    res.json(receitaAtualizada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar receita" });
    console.log(error);
  }
});

// deletar uma receita
router.delete("/:id", proteger, async (req, res) => {
  try {
    const receita = await Receita.findById(req.params.id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }
    // Verifica se o usuário é o criador da receita
    if (receita.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Acesso negado" });
    }
    await receita.deleteOne();
    res.json({ message: "Receita deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar receita" });
    console.log(error);
  }
});

export default router;
