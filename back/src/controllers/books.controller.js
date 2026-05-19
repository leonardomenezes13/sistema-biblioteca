const service = require("../services/books.service");

function validarId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0 ? null : "ID invalido";
}

function validarLivro(titulo, autor) {
    if (titulo === undefined || autor === undefined) {
        return "Titulo e autor sao obrigatorios";
    }

    if (typeof titulo !== "string" || typeof autor !== "string") {
        return "Titulo e autor devem ser textos";
    }

    if (!titulo.trim() || !autor.trim()) {
        return "Titulo e autor nao podem estar vazios";
    }

    if (titulo.trim().length > 255) {
        return "Titulo deve ter no maximo 255 caracteres";
    }

    if (autor.trim().length > 255) {
        return "Autor deve ter no maximo 255 caracteres";
    }

    return null;
}

async function listarLivros(req, res) {
    const livros = await service.listarLivros();
    res.json(livros);
}

async function buscarLivroPorId(req, res) {
    const erroId = validarId(req.params.id);
    if (erroId) return res.status(400).json({ mensagem: erroId });

    const livro = await service.buscarLivroPorId(req.params.id);
    res.json(livro);
}

async function cadastrarLivro(req, res) {
    const { titulo, autor } = req.body || {};

    const erro = validarLivro(titulo, autor);
    if (erro) return res.status(400).json({ mensagem: erro });

    const livro = await service.cadastrarLivro(titulo, autor);
    res.status(201).json({ mensagem: "Livro cadastrado com sucesso", livro });
}

async function atualizarLivro(req, res) {
    const erroId = validarId(req.params.id);
    if (erroId) return res.status(400).json({ mensagem: erroId });

    const { titulo, autor } = req.body || {};

    const erro = validarLivro(titulo, autor);
    if (erro) return res.status(400).json({ mensagem: erro });

    const livro = await service.atualizarLivro(req.params.id, titulo, autor);
    res.json({ mensagem: "Livro atualizado com sucesso", livro });
}

async function removerLivro(req, res) {
    const erroId = validarId(req.params.id);
    if (erroId) return res.status(400).json({ mensagem: erroId });

    await service.removerLivro(req.params.id);
    res.status(204).send();
}

module.exports = {
    listarLivros,
    buscarLivroPorId,
    cadastrarLivro,
    atualizarLivro,
    removerLivro
};
