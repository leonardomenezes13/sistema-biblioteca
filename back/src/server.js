require("dotenv").config();

const express = require("express");
const cors = require("cors");
const booksRoutes = require("./routes/books.routes");

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("API da biblioteca funcionando");
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const mensagem = err.message || "Erro interno do servidor";
    console.error(`[${new Date().toISOString()}] ${status} - ${mensagem}`, err.stack);
    res.status(status).json({ mensagem });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
