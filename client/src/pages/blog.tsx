import React from "react";
import { blogArticles } from "../lib/blog-data";
import { Link } from "wouter";

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="mb-8">
        <Link to="/" className="text-emerald-600 hover:underline">← Back to Home</Link>
      </div>
      <div className="space-y-8">
        {blogArticles.map(article => (
          <div key={article.slug} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-1">
              <Link to={`/blog/${article.slug}`} className="hover:underline text-emerald-700">{article.title}</Link>
            </h2>
            <div className="text-gray-500 text-sm mb-2">{article.date}</div>
            <div className="mb-2 text-gray-700">{article.content.slice(0, 100)}...</div>
            <Link to={`/blog/${article.slug}`} className="text-emerald-600 hover:underline text-sm">Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
} 