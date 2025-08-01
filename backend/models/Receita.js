import mongoose from "mongoose";

const receitaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    ingredientes: [
      {
        type: String,
        required: true,
      },
    ],
    instrucoes: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    fotoURL: {
      type: String,
      required: true,
    },
    tempoPreparo: {
      type: Number,
      required: true,
    },
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Receita = mongoose.model("Receita", receitaSchema);

export default Receita;
