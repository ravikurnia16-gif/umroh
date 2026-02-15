import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { articles as staticArticles } from '../data/articles';
import { Link } from 'react-router-dom';
import { FiLoader, FiFileText } from 'react-icons/fi';

const Blog = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const data = await api.getArticles();
                if (data && data.length > 0) {
                    setArticlesData(data);
                } else {
                    setArticlesData(staticArticles);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticlesData(staticArticles);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Blog & Artikel Umroh</h1>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FiLoader className="animate-spin text-4xl text-emerald-600" />
                    </div>
                ) : (
                    <>
                        {articlesData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articlesData.map((article) => (
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
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                <FiFileText className="text-5xl text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Belum ada artikel</h3>
                                <p className="text-slate-500">Nantikan artikel menarik kami selanjutnya.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
