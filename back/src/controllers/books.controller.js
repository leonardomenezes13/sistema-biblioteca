const livros = [
    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell"
    }
];

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

function listarLivros(req, res) {
    res.json(livros);
}

function buscarLivroPorId(req, res) {
    const { id } = req.params;

    const livro = livros.find((livro) => livro.id === Number(id));

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro nao encontrado"
        });
    }

    res.json(livro);
}

function cadastrarLivro(req, res) {
    const { titulo, autor } = req.body;

    const erro = validarLivro(titulo, autor);

    if (erro) {
        return res.status(400).json({
            mensagem: erro
        });
    }

    const novoId = livros.length > 0
        ? Math.max(...livros.map((livro) => livro.id)) + 1
        : 1;

    const novoLivro = {
        id: novoId,
        titulo: titulo.trim(),
        autor: autor.trim()
    };

    livros.push(novoLivro);

    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso",
        livro: novoLivro
    });
}

function atualizarLivro(req, res) {
    const { id } = req.params;
    const { titulo, autor } = req.body;

    const erro = validarLivro(titulo, autor);

    if (erro) {
        return res.status(400).json({
            mensagem: erro
        });
    }

    const livro = livros.find((livro) => livro.id === Number(id));

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro nao encontrado"
        });
    }

    livro.titulo = titulo.trim();
    livro.autor = autor.trim();

    res.json({
        mensagem: "Livro atualizado com sucesso",
        livro
    });
}

function removerLivro(req, res) {
    const { id } = req.params;

    const livroIndex = livros.findIndex(
        (livro) => livro.id === Number(id)
    );

    if (livroIndex === -1) {
        return res.status(404).json({
            mensagem: "Livro nao encontrado"
        });
    }

    livros.splice(livroIndex, 1);

    res.json({
        mensagem: "Livro removido com sucesso"
    });
}

module.exports = {
    listarLivros,
    buscarLivroPorId,
    cadastrarLivro,
    atualizarLivro,
    removerLivro
};
