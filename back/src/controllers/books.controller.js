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

    return null;
}

async function listarLivros(req, res, next) {
    try {
        const livros = await service.listarLivros();
        res.json(livros);
    } catch (err) {
        next(err);
    }
}

async function buscarLivroPorId(req, res, next) {
    try {
        const erroId = validarId(req.params.id);
        if (erroId) return res.status(400).json({ mensagem: erroId });

        const livro = await service.buscarLivroPorId(req.params.id);
        res.json(livro);
    } catch (err) {
        next(err);
    }
}

async function cadastrarLivro(req, res, next) {
    try {
        const { titulo, autor } = req.body || {};

        const erro = validarLivro(titulo, autor);
        if (erro) return res.status(400).json({ mensagem: erro });

        const livro = await service.cadastrarLivro(titulo, autor);
        res.status(201).json({ mensagem: "Livro cadastrado com sucesso", livro });
    } catch (err) {
        next(err);
    }
}

async function atualizarLivro(req, res, next) {
    try {
        const erroId = validarId(req.params.id);
        if (erroId) return res.status(400).json({ mensagem: erroId });

        const { titulo, autor } = req.body || {};

        const erro = validarLivro(titulo, autor);
        if (erro) return res.status(400).json({ mensagem: erro });

        const livro = await service.atualizarLivro(req.params.id, titulo, autor);
        res.json({ mensagem: "Livro atualizado com sucesso", livro });
    } catch (err) {
        next(err);
    }
}

async function removerLivro(req, res, next) {
    try {
        const erroId = validarId(req.params.id);
        if (erroId) return res.status(400).json({ mensagem: erroId });

        await service.removerLivro(req.params.id);
        res.json({ mensagem: "Livro removido com sucesso" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listarLivros,
    buscarLivroPorId,
    cadastrarLivro,
    atualizarLivro,
    removerLivro
};
