// Use relative path for production (served by same origin) or localhost for dev if proxied
const API_URL = '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    // Auth
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            throw { response: { data: error } };
        }
        return response.json();
    },
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw { response: { data: error } };
        }
        return response.json();
    },
    getMe: async () => {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Auth check failed');
        return response.json();
    },

    // Packages
    getPackages: async (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_URL}/packages?${query}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    getPackageById: async (id) => {
        const response = await fetch(`${API_URL}/packages/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // Travels
    getTravels: async () => {
        const response = await fetch(`${API_URL}/travels`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },
    getTravelById: async (id) => {
        const response = await fetch(`${API_URL}/travels/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // Promos
    getPromos: async () => {
        const response = await fetch(`${API_URL}/promos`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // Articles
    getArticles: async () => {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // FAQ
    getFaq: async () => {
        const response = await fetch(`${API_URL}/faq`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // Reviews
    getReviews: async () => {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
};
