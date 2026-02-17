import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Assume there's an API call to get current user info
                    const userData = await api.getMe();
                    setUser(userData);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const requestOTP = async (data) => {
        try {
            await api.post('/api/auth/request-otp', data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Gagal meminta OTP' };
        }
    };

    const verifyOTP = async (phone, otp) => {
        try {
            const response = await api.post('/api/auth/verify-otp', { phone, otp });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Kode OTP salah' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, requestOTP, verifyOTP, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
