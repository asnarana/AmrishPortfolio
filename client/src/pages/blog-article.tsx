import React from "react";
import { Link, useRoute } from "wouter";
import { blogArticles } from "../lib/blog-data";

export default function BlogArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <div className="text-gray-500 text-sm mb-6">{article.date}</div>
      <div className="mb-8 whitespace-pre-line">{article.content}</div>
      <Link to="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
    </div>
  );
}