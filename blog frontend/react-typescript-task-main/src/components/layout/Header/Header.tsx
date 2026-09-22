import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(query)}`);
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-lg font-bold text-white">
            B
          </span>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            BlogSpace
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-900 hover:text-blue-600"
          >
            Home
          </Link>

          <a
            href="/#latest-posts"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Posts
          </a>

          <a
            href="/#latest-posts"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Users
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* Desktop Search */}
          <div className="hidden w-64 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 lg:flex">
            <Search
              size={17}
              className="shrink-0 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Search articles or topics..."
              className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search"
              className="text-slate-500 hover:text-blue-600"
            >
              <Search size={15} />
            </button>
          </div>

          {/* New Post */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 lg:flex"
          >
            <Plus size={18} />
            New Post
          </button>

          {/* Profile */}
          <button
            type="button"
            className="hidden items-center gap-1 rounded-lg p-1.5 hover:bg-slate-100 sm:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
              JD
            </span>

            <ChevronDown
              size={16}
              className="text-slate-500"
            />
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() =>
              setIsMobileMenuOpen((current) => !current)
            }
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Home
            </Link>

            <a
              href="/#latest-posts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Posts
            </a>

            <a
              href="/#latest-posts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Users
            </a>

            <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Search articles..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="bg-blue-600 px-4 text-white"
                aria-label="Search"
              >
                <Search size={17} />
              </button>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus size={18} />
              New Post
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;