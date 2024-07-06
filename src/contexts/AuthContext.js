"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { login, me } from "@/Services/Auth/AuthService";
import { toast } from "react-toastify";
import accessControl from "@components/layout/vertical/accessControl";

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
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
            const { access_token } = res.data.data;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', access_token);
            }
            toast.success('ورود با موفقیت انجام شد', {
                position: "top-center",
                duration: 3000
            });

            // گرفتن اطلاعات کاربر
            const userResponse = await axios.get(me(), {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const userData = userResponse.data.data.user.original;
            setUser(userData);

            if (userData.status === 81) {
                router.push('/profile/complete');
                return;
            }

            const workGroup = userData.work_group;
            const allowedPages = accessControl[workGroup];
            if (allowedPages && allowedPages.length > 0) {
                const firstPage = allowedPages[0].href;
                router.push(firstPage);
            } else {
                router.push('/403');
            }
        } catch (error) {
            console.log(error);
            toast.error('اطلاعات وارد شده صحیح نمیباشد', {
                position: "top-center",
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
        <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
