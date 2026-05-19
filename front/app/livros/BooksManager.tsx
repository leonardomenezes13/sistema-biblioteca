"use client";

import { useState, useMemo } from "react";
import { Book, createBook, updateBook, deleteBook } from "@/lib/api";
import BookModal from "@/app/components/BookModal";

type SortKey = "titulo" | "autor";
type SortDir = "asc" | "desc";

type Props = {
  initialBooks: Book[];
};

export default function BooksManager({ initialBooks }: Props) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("titulo");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const authors = useMemo(
    () => [...new Set(books.map((b) => b.autor))].sort(),
    [books]
  );

  const filtered = useMemo(() => {
    let result = books;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.titulo.toLowerCase().includes(q) ||
          b.autor.toLowerCase().includes(q)
      );
    }

    if (authorFilter) {
      result = result.filter((b) => b.autor === authorFilter);
    }

    return [...result].sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      return sortDir === "asc"
        ? valA.localeCompare(valB, "pt-BR")
        : valB.localeCompare(valA, "pt-BR");
    });
  }, [books, search, authorFilter, sortKey, sortDir]);

  const hasFilters = search || authorFilter;

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function openAdd() {
    setEditingBook(null);
    setModalOpen(true);
  }

  function openEdit(book: Book) {
    setEditingBook(book);
    setModalOpen(true);
  }

  async function handleSave(titulo: string, autor: string) {
    if (editingBook) {
      const updated = await updateBook(editingBook.id, titulo, autor);
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } else {
      const created = await createBook(titulo, autor);
      setBooks((prev) => [...prev, created]);
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Erro ao remover livro");
    } finally {
      setDeletingId(null);
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <span className="ml-1 text-gray-300 text-xs">↕</span>;
    return (
      <span className="ml-1 text-indigo-500 text-xs">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Barra de filtros */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-3">
          {/* Busca */}
          <div className="relative min-w-56 flex-1">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título ou autor..."
              className="pl-8 pr-3 py-2 w-full rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filtro por autor */}
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos os autores</option>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {/* Ordenação */}
          <select
            value={`${sortKey}-${sortDir}`}
            onChange={(e) => {
              const [key, dir] = e.target.value.split("-") as [
                SortKey,
                SortDir
              ];
              setSortKey(key);
              setSortDir(dir);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="titulo-asc">Título A → Z</option>
            <option value="titulo-desc">Título Z → A</option>
            <option value="autor-asc">Autor A → Z</option>
            <option value="autor-desc">Autor Z → A</option>
          </select>

          {/* Limpar filtros */}
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setAuthorFilter("");
              }}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
            >
              Limpar filtros
            </button>
          )}

          <div className="ml-auto">
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adicionar livro
            </button>
          </div>
        </div>

        {deleteError && (
          <div className="mx-4 mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {deleteError}
          </div>
        )}

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500 w-12">#</th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 cursor-pointer select-none hover:text-gray-800 transition-colors"
                  onClick={() => toggleSort("titulo")}
                >
                  Título
                  <SortIcon col="titulo" />
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 cursor-pointer select-none hover:text-gray-800 transition-colors"
                  onClick={() => toggleSort("autor")}
                >
                  Autor
                  <SortIcon col="autor" />
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    {hasFilters
                      ? "Nenhum livro encontrado para os filtros aplicados."
                      : "Nenhum livro cadastrado ainda."}
                  </td>
                </tr>
              ) : (
                filtered.map((book, index) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      {book.titulo}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{book.autor}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openEdit(book)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mr-4 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        disabled={deletingId === book.id}
                        className="text-red-500 hover:text-red-700 font-medium disabled:opacity-40 transition-colors"
                      >
                        {deletingId === book.id ? "Removendo..." : "Remover"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé com contagem */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>
            {hasFilters ? (
              <>
                <span className="font-medium text-gray-600">{filtered.length}</span> resultado
                {filtered.length !== 1 && "s"} de{" "}
                <span className="font-medium text-gray-600">{books.length}</span>{" "}
                {books.length === 1 ? "livro" : "livros"}
              </>
            ) : (
              <>
                <span className="font-medium text-gray-600">{books.length}</span>{" "}
                {books.length === 1 ? "livro" : "livros"} no acervo
              </>
            )}
          </span>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setAuthorFilter("");
              }}
              className="text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <BookModal
          book={editingBook}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
