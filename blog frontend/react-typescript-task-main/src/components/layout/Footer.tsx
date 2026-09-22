import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
              B
            </span>

            <span className="text-lg font-bold text-slate-900">
              BlogSpace
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            A simple blog platform to share ideas, learn from
            others and be part of a growing community.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Product
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <Link className="block hover:text-blue-600" to="/">
              Home
            </Link>
            <a href="/#latest-posts" className="block hover:text-blue-600">
              Posts
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Resources
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <span className="block">Help Center</span>
            <span className="block">Community</span>
            <span className="block">Guidelines</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Company
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <span className="block">About</span>
            <span className="block">Privacy Policy</span>
            <span className="block">Contact</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 BlogSpace. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;