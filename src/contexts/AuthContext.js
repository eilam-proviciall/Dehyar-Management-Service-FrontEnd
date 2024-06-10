"use client";
import {createContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {login, me} from "@/Services/Auth/AuthService";

// Auth Context
const AuthContext = createContext({
    user: null,
    loading: false,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});
const HOME_PAGE_URL = '/municipality/list';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            console.log('init');
            if (typeof window !== 'undefined') {
                const storedToken = window.localStorage.getItem('token');
                console.log(storedToken);
                if (storedToken) {
                    setLoading(true);
                    try {
                        const response = await axios.get(me(), {
                            headers: {
                                Authorization: `Bearer ${storedToken}`,
                            },
                        });
                        console.log(response);
                        // setUser(response.data.user);
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
            }
        };

        initAuth();
    }, [router]); // اضافه کردن router به وابستگی های useEffect

    const handleLogin = async (params) => {
        console.log(params);
        try {
            const res = await axios.post(login(), {
                nid: params.email,
                password: params.password,
            });
            const {access_token} = res.data.data;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', access_token);
            }
            router.push(HOME_PAGE_URL);
        } catch (error) {
            alert('اطلاعات مورد نظر صحیح نمیباشد');
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{user, loading, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
