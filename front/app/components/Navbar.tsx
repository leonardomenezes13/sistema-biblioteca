import Link from "next/link";

type Props = {
  active?: "dashboard" | "livros";
};

export default function Navbar({ active }: Props) {
  const link =
    "text-sm transition-colors px-1 pb-0.5 border-b-2";
  const activeStyle = "text-indigo-600 font-medium border-indigo-600";
  const inactiveStyle =
    "text-gray-500 hover:text-gray-900 border-transparent";

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 mr-2 shrink-0">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-base font-bold text-gray-900 tracking-tight">
            LibManager
          </span>
        </Link>

        <Link
          href="/"
          className={`${link} ${active === "dashboard" ? activeStyle : inactiveStyle}`}
        >
          Dashboard
        </Link>
        <Link
          href="/livros"
          className={`${link} ${active === "livros" ? activeStyle : inactiveStyle}`}
        >
          Livros
        </Link>
      </div>
    </nav>
  );
}
