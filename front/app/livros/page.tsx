import { fetchBooks } from "@/lib/api";
import { Book } from "@/lib/api";
import Navbar from "@/app/components/Navbar";
import BooksManager from "./BooksManager";

export default async function LivrosPage() {
  let books: Book[] = [];
  let apiError = false;

  try {
    books = await fetchBooks();
  } catch {
    apiError = true;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar active="livros" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Gerenciamento de Livros
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Adicione, edite, filtre e organize o acervo
          </p>
        </div>

        {apiError && (
          <div className="mb-6 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Não foi possível conectar à API. Verifique se o servidor está rodando.
          </div>
        )}

        <BooksManager initialBooks={books} />
      </main>
    </div>
  );
}
