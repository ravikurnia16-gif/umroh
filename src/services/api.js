// Use relative path for production (served by same origin) or localhost for dev if proxied
const API_URL = '/api';

export const api = {
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
