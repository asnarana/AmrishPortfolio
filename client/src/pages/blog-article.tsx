import React from "react";
import { Link, useRoute } from "wouter"; // for navigation between pages 
import { blogArticles } from "../lib/blog-data"; // for the blog articles 

// this is the page for the blog article
// it displays the article content and allows the user to navigate back to the blog page
// it uses the blog-data.ts file to get the article data
// it uses the wouter library to navigate between pages
// it uses the react query library to fetch the article data


// component to display single blog article based on url slug
export default function BlogArticlePage() {
  // extract the slug from the url
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  // find the article with the matching slug
  const article = blogArticles.find(a => a.slug === slug);
  // if the article is not found, display a message

  // If no article is found, show a "Not Found" message and a link back to the blog list
  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
      </div>
    );
  }
  // If the article is found, display its title, date, content, and a back link to the blog list
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <div className="text-gray-500 text-sm mb-6">{article.date}</div>
      <div className="mb-8 whitespace-pre-line">{article.content}</div>
      <Link to="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
    </div>
  );
}