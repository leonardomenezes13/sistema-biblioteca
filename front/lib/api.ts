const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type Book = {
  id: number;
  titulo: string;
  autor: string;
};

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/books`, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao buscar livros");
  return res.json();
}

export async function createBook(titulo: string, autor: string): Promise<Book> {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensagem ?? "Falha ao criar livro");
  return data.livro;
}

export async function updateBook(id: number, titulo: string, autor: string): Promise<Book> {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensagem ?? "Falha ao atualizar livro");
  return data.livro;
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.mensagem ?? "Falha ao remover livro");
  }
}
