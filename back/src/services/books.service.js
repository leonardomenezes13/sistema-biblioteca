const pool = require("../database/connection");

async function listarLivros() {
    const [rows] = await pool.query("SELECT id, titulo, autor FROM livros");
    return rows;
}

async function buscarLivroPorId(id) {
    const [rows] = await pool.query("SELECT * FROM livros WHERE id = ?", [id]);

    if (!rows[0]) {
        const err = new Error("Livro nao encontrado");
        err.status = 404;
        throw err;
    }

    return rows[0];
}

async function cadastrarLivro(titulo, autor) {
    const [result] = await pool.query(
        "INSERT INTO livros (titulo, autor) VALUES (?, ?)",
        [titulo.trim(), autor.trim()]
    );

    return { id: result.insertId, titulo: titulo.trim(), autor: autor.trim() };
}

async function atualizarLivro(id, titulo, autor) {
    const [result] = await pool.query(
        "UPDATE livros SET titulo = ?, autor = ? WHERE id = ?",
        [titulo.trim(), autor.trim(), id]
    );

    if (result.affectedRows === 0) {
        const err = new Error("Livro nao encontrado");
        err.status = 404;
        throw err;
    }

    return { id: Number(id), titulo: titulo.trim(), autor: autor.trim() };
}

async function removerLivro(id) {
    const [result] = await pool.query("DELETE FROM livros WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        const err = new Error("Livro nao encontrado");
        err.status = 404;
        throw err;
    }
}

module.exports = {
    listarLivros,
    buscarLivroPorId,
    cadastrarLivro,
    atualizarLivro,
    removerLivro
};
