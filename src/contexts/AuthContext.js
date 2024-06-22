"use client";
import {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {login, me} from "@/Services/Auth/AuthService";
import {toast} from "react-toastify";

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const HOME_PAGE_URL = '/municipality/list';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            if (typeof window !== 'undefined') {
                const storedToken = window.localStorage.getItem('token');
                if (storedToken) {
                    try {
                        const response = await axios.get(me(), {
                            headers: {
                                Authorization: `Bearer ${storedToken}`,
                            },
                        });
                        setUser(response.data.data.user.original);
                    } catch (error) {
                        toast.error('اطلاعات نادرست است');
                         setUser(null);
                        if (router.pathname !== '/login') {
                            router.push('/login');
                        }
                    } finally {
                        setLoading(false);
                    }
                } else {
                    if (router.pathname !== '/login') {
                        router.push('/login');
                    }
                    setLoading(false);
                }
            }
        };

        initAuth();
    }, [router]);

    const handleLogin = async (params) => {
        try {
            const res = await axios.post(login(), {
                nid: params.email,
                password: params.password,
            });
            const {access_token} = res.data.data;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', access_token);

            }
            toast.success('ورود با موفقیت انجام شد', {
                position: "top-center",
                duration: 3000
            });
            router.push(HOME_PAGE_URL);
        } catch (error) {
            console.log(error);
            toast.error('اطلاعات وارد شده صحیح نمیباشد',{
                position:"top-center",
                duration: 3000
            });
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
