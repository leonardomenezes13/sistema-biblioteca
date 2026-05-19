"use client";

import { useState } from "react";
import { Book, createBook, updateBook, deleteBook } from "@/lib/api";
import BookModal from "./BookModal";

type Props = {
  initialBooks: Book[];
};

export default function BooksSection({ initialBooks }: Props) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filtered = books.filter(
    (b) =>
      b.titulo.toLowerCase().includes(search.toLowerCase()) ||
      b.autor.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            Acervo
            <span className="ml-2 text-xs font-normal text-gray-400">
              {filtered.length} {filtered.length === 1 ? "livro" : "livros"}
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
                placeholder="Buscar título ou autor..."
                className="pl-8 pr-3 py-1.5 w-full sm:w-60 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
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
          <div className="mx-5 mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {deleteError}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500 w-12">#</th>
                <th className="px-5 py-3 font-medium text-gray-500">Título</th>
                <th className="px-5 py-3 font-medium text-gray-500">Autor</th>
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
                    className="px-5 py-10 text-center text-gray-400"
                  >
                    {search
                      ? "Nenhum livro encontrado para essa busca."
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
