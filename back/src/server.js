const express = require("express"); 
const cors = require("cors");

const app = express();

app.use(cors()) //comunicação com o frontend
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API da biblioteca funcionando");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})
