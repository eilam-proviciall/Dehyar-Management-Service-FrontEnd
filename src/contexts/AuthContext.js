"use client"
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Auth Context
const AuthContext = createContext({
    user: null,
    loading: false,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem('token');
            if (storedToken) {
                setLoading(true);
                try {
                    const response = await axios.get('/api/me', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                    if (router.pathname !== '/login') {
                        router.push('/login');
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        initAuth();
    }, []);

    const handleLogin = async (params) => {
        // setLoading(true);
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', params)
            const { access_token } = res.data.data;
            console.log(access_token)
            localStorage.setItem('token', access_token);
            // setUser(user);
            // router.push('/');
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
