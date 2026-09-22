import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MessageCircle, Clock } from "lucide-react";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer";
import { getPosts } from "../services/post.service";
import { getUsers } from "../services/user.service";
import type { Post } from "../types/post";
import type { User } from "../types/user";

function Home() {
  // Stores the posts received from the backend.
  const [posts, setPosts] = useState<Post[]>([]);

  // Stores the users received from the backend.
  const [users, setUsers] = useState<User[]>([]);

  // Controls the loading state.
  const [loading, setLoading] = useState(true);

  // Stores API error messages.
  const [error, setError] = useState("");

  // Reads and updates the search value in the URL.
  const [searchParams, setSearchParams] = useSearchParams();

  // Gets the current search value from the URL.
  const searchTerm = searchParams.get("search") ?? "";

  // Fetch posts and users when the page loads.
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers(),
        ]);

        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filters posts using title or body.
  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
  }, [posts, searchTerm]);

  // Finds the author for a particular post.
  const getAuthor = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  // Updates the search value in the URL.
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12 sm:px-10 lg:px-16">
            {/* Decorative circles */}
            <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-blue-100/70" />

            <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-blue-100/60" />

            <div className="absolute bottom-[-60px] left-1/4 h-40 w-40 rounded-full bg-slate-100/80" />

            <div className="relative mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                BlogSpace
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Discover. Read. Share.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                A simple blog platform to share ideas, learn from
                others and be part of a growing community.
              </p>

              {/* Search */}
              <div className="mx-auto mt-8 flex max-w-2xl items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <Search
                  size={20}
                  className="ml-4 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search articles, topics or authors..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />

                <button
                  type="button"
                  className="m-1 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => {
                    const input = document.querySelector(
                      "input[placeholder='Search articles, topics or authors...']"
                    ) as HTMLInputElement | null;

                    if (input) {
                      const value = input.value.trim();

                      if (value) {
                        setSearchParams({ search: value });
                      } else {
                        setSearchParams({});
                      }
                    }
                  }}
                >
                  <Search size={18} />
                </button>
              </div>

              {/* Category pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Technology",
                  "Design",
                  "Productivity",
                  "Career",
                  "Lifestyle",
                  "Health",
                ].map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section
          id="latest-posts"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Explore
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                Latest Posts
              </h2>

              {searchTerm && (
                <p className="mt-2 text-sm text-slate-500">
                  Showing results for "{searchTerm}"
                </p>
              )}
            </div>

            <select
              aria-label="Sort posts"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none sm:w-auto"
              defaultValue="latest"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="title">Sort by: Title</option>
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">
                Loading posts...
              </p>
            </div>
          )}

          {/* API Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
              <p className="font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Empty API result */}
          {!loading && !error && posts.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <p className="text-slate-600">
                No posts are available right now.
              </p>
            </div>
          )}

          {/* Search result empty */}
          {!loading &&
            !error &&
            posts.length > 0 &&
            filteredPosts.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
                <p className="text-lg font-semibold text-slate-800">
                  No posts found
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  No posts match "{searchTerm}".
                </p>
              </div>
            )}

          {/* Post Cards */}
          {!loading &&
            !error &&
            filteredPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredPosts.map((post, index) => {
                  const author = getAuthor(post.userId);

                  return (
                    <Link
                      key={post.id}
                      to={`/posts/${post.id}`}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Image-like visual area */}
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-bold text-blue-200">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Category */}
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          Technology
                        </span>

                        {/* Title */}
                        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-6 text-slate-900 transition group-hover:text-blue-600">
                          {post.title}
                        </h3>

                        {/* Content */}
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {post.body}
                        </p>

                        {/* Author */}
                        <div className="mt-5 flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                            {author?.name
                              ?.split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2) || "AU"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {author?.name ?? "Unknown author"}
                            </p>

                            <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock size={13} />
                                5 min read
                              </span>

                              <span className="flex items-center gap-1">
                                <MessageCircle size={13} />
                                Comments
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
        </section>

        {/* Newsletter Section */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-blue-50 px-6 py-12 text-center sm:px-10">
            <div className="absolute -left-10 bottom-[-50px] h-32 w-32 rounded-full bg-white/70" />

            <div className="absolute -right-10 top-[-50px] h-32 w-32 rounded-full bg-blue-100/70" />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Stay in the loop
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                Get the latest posts delivered to your inbox
              </h2>

              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Join our community and never miss a great article.
              </p>

              <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                />

                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;