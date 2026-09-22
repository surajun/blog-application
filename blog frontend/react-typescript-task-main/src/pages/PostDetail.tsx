import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer";
import { getPostById, getPostComments } from "../services/post.service";
import { getUserById } from "../services/user.service";

import type { Post } from "../types/post";
import type { User } from "../types/user";
import type { Comment } from "../types/comment";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        setError("Invalid post ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const postId = Number(id);

        if (!Number.isInteger(postId) || postId <= 0) {
          throw new Error("Invalid post ID.");
        }

        const postData = await getPostById(postId);
        setPost(postData);

        const [authorData, commentsData] = await Promise.all([
          getUserById(postData.userId),
          getPostComments(postId),
        ]);

        setAuthor(authorData);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
        setError("Failed to load this post.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center">
          <p className="text-slate-500">Loading post...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Post not found
          </h1>

          <p className="mt-2 text-slate-500">
            {error || "The requested post does not exist."}
          </p>

          <Link
            to="/"
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const initials =
    author?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "AU";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to posts
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Main article */}
            <article>
              <div className="mb-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Blog Post
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
                Read this article and explore the discussion from the
                BlogSpace community.
              </p>

              {/* Author */}
              <div className="mt-7 flex items-center justify-between gap-4 border-b border-slate-200 pb-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                    {initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {author?.name || "Unknown author"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      @{author?.username || "unknown"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={17} />
                    {comments.length}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={17} />
                    Article
                  </span>
                </div>
              </div>

              {/* Article visual */}
              <div className="my-8 flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 sm:h-80">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-200">
                    B
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-400">
                    BlogSpace
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="max-w-3xl">
                {post.body.split(/\n+/).map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 text-base leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Comments */}
              <section className="mt-12 border-t border-slate-200 pt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-950">
                    Comments ({comments.length})
                  </h2>
                </div>

                {comments.length === 0 ? (
                  <p className="mt-6 text-sm text-slate-500">
                    No comments yet.
                  </p>
                ) : (
                  <div className="mt-6 divide-y divide-slate-200">
                    {comments.map((comment) => (
                      <div key={comment.id} className="py-5">
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                            {comment.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-slate-900">
                                {comment.name}
                              </p>

                              <span className="text-xs text-slate-400">
                                {comment.email}
                              </span>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {comment.body}
                            </p>

                            <button
                              type="button"
                              className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment form */}
                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    Add a Comment
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <textarea
                      rows={4}
                      placeholder="Write your comment..."
                      className="min-h-28 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />

                    <button
                      type="button"
                      className="inline-flex h-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <Send size={16} />
                      Post Comment
                    </button>
                  </div>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">
                    About the Author
                  </h2>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                      {initials}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {author?.name || "Unknown author"}
                      </p>

                      <p className="text-sm text-slate-500">
                        @{author?.username || "unknown"}
                      </p>
                    </div>
                  </div>

                  {author?.email && (
                    <p className="mt-4 break-all text-sm text-slate-500">
                      {author.email}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">
                    Article Info
                  </h2>

                  <div className="mt-5 space-y-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Post ID</span>

                      <span className="font-semibold text-slate-900">
                        #{post.id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Comments</span>

                      <span className="font-semibold text-slate-900">
                        {comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PostDetail;