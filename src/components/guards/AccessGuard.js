"use client"
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import accessControl from "@components/layout/vertical/accessControl";
import { useRouter } from "next/navigation";

const AccessGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (!loading) {
            const currentPath = window.location.pathname; // گرفتن مسیر فعلی
            let allowedPaths = [];

            if (user && accessControl[user.work_group]) {
                allowedPaths = accessControl[user.work_group].map(page => page.href);
            }
            console.log(allowedPaths    )
            if (allowedPaths.includes(currentPath)) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                router.replace('/403'); // هدایت به صفحه 403
            }
        }
    }, [user, loading, router]);

    if (loading || isAuthorized === null) {
        return <div>Loading...</div>; // یا هر اسپینر لودینگ دیگر
    }

    // اگر کاربر مجاز نیست، جلوگیری از رندر بیشتر
    if (!isAuthorized) {
        return null;
    }

    return children;
};

export default AccessGuard;
