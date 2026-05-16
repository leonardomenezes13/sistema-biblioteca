const express = require("express");
const {
    listarLivros,
    buscarLivroPorId,
    cadastrarLivro,
    atualizarLivro,
    removerLivro
} = require("../controllers/books.controller");

const router = express.Router();

router.get("/", listarLivros);
router.get("/:id", buscarLivroPorId);
router.post("/", cadastrarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", removerLivro);

module.exports = router;
