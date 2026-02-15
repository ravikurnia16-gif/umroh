import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold mb-4 dark:text-white">Aplikasi mengalami kendala</h1>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Mohon maaf, terjadi kesalahan teknis saat memuat halaman ini.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                        >
                            Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
