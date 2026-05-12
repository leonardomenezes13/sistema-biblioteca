const express = require("express");

const router = express.Router();

const livros =[
    {
        id: 1,
        título: "Dom Casmurro",
        autor: "Machado de Assis"
    },
    {
        id: 2,
        título: "1984",
        autor: "George Orwell"
    }
];

router.get("/", (req, res) => {
    res.json(livros);
});

router.post("/" , (req, res) => {
    const novoLivro = req.body

    livros.push(novoLivro);

    res.status(201).json({
        mensagem:"Livro cadastrado com sucesso!",
        livro: novoLivro
    })
})


module.exports = router;
