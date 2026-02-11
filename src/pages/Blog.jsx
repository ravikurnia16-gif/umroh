import React from 'react';
import { articles } from '../data/articles';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Blog & Artikel Umroh</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <article key={article.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded font-medium">{article.category}</span>
                                    <span>{article.date}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                    <Link to={`/blog/${article.id}`}>{article.title}</Link>
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                                <Link to={`/blog/${article.id}`} className="text-emerald-600 font-medium text-sm hover:underline">
                                    Baca Selengkapnya &rarr;
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
