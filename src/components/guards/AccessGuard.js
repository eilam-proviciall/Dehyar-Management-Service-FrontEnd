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
            const currentPath = window.location.pathname;

            if (user && user.status === 81) {
                router.replace('/profile/complete');
                setIsAuthorized(false);
                return;
            }

            let allowedGroups = [];

            for (const [group, pages] of Object.entries(accessControl)) {
                if (pages.some(page => page.href === currentPath)) {
                    allowedGroups.push(parseInt(group));
                }
            }

            if (allowedGroups.includes(99) || (user && allowedGroups.includes(user.work_group))) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                router.replace('/403');
            }
        }
    }, [user, loading, router]);

    if (loading || isAuthorized === null) {
        return <div>Loading...</div>; // یا هر اسپینر لودینگ دیگر
    }

    if (!isAuthorized) {
        return null;
    }

    return children;
};

export default AccessGuard;
