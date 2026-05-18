require("dotenv").config();

const express = require("express");
const cors = require("cors");
const booksRoutes = require("./routes/books.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("API da biblioteca funcionando");
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const mensagem = err.message || "Erro interno do servidor";
    res.status(status).json({ mensagem });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
