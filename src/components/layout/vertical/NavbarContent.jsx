"use client";
import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
import NavToggle from './NavToggle';
import ModeDropdown from '@components/layout/shared/ModeDropdown';
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses';
import UserDropdown from "@components/layout/shared/UserDropdown";
import api from "@utils/axiosInstance";
import {me} from "@/Services/Auth/AuthService";

const NavbarContent = () => {
    const [userDetails,setUserDetails] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await api.get(`${me()}`, { requiresAuth: true });
            setUserDetails(response.data.data.user.original);
        };
        fetchUserData();
    }, []);

    return (
        <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
            <div className='flex items-center gap-[7px]'>
                <NavToggle />
            </div>
            <div className='flex items-center'>
                <ModeDropdown />
                <UserDropdown userDetails={userDetails} />
            </div>
        </div>
    );
};

export default NavbarContent;
