import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle';
import { user, usersCount } from '@/Services/Auth/AuthService';
import api from '@/utils/axiosInstance';
import { set } from 'js-cookie';

const GovenorCards = ({ loading, setLoading, userGeoState }) => {

    // States
    const [userList, setUserList] = useState([]);
    const [CFODetails, setCFODetails] = useState([]);
    const [bakhshdarDetails, setBakhshdarDetails] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);

    // Vars
    const data = [
        {
            title: 'مسئول امور مالی',
            value: CFODetails,
            avatarIcon: 'ri-user-add-line',
            avatarColor: 'error',
            trend: 'positive',
            trendNumber: '0%',
            subtitle: '',
            loading: loading,
        },
        {
            title: 'مسئول امور فنی',
            value: 0,
            avatarIcon: 'ri-group-line',
            avatarColor: 'primary',
            trend: 'positive',
            trendNumber: '0%',
            subtitle: '',
            loading: loading,
        },
        {
            title: 'بخشدار',
            value: bakhshdarDetails,
            avatarIcon: 'ri-user-follow-line',
            avatarColor: 'success',
            trend: 'positive',
            trendNumber: '0%',
            subtitle: '',
            loading: loading,
        },
        {
            title: 'دهیار',
            value: '0',
            avatarIcon: 'ri-user-search-line',
            avatarColor: 'warning',
            trend: 'negative',
            trendNumber: '0%',
            subtitle: '',
            loading: loading,
        }
    ];

    const fetchData = () => {
        setLoading(true);
        api.get(usersCount(), { requiresAuth: true })
            .then((response) => {
                setUserList(response.data.data.countAllUsers);
                setCFODetails(response.data.data.countCFOUsers);
                setBakhshdarDetails(response.data.data.countBakhshdar);
            })
            .catch(() => {
                console.error('خطا در دریافت اطلاعات کاربران');
            })
            .finally(() => {
                setLoading(false);
                setShouldFetch(false);
            });
    }

    useEffect(() => {
        if (userGeoState && shouldFetch) {
            fetchData();
        }
    }, [userGeoState, shouldFetch]);

    useEffect(() => {
        if (loading) {
            setShouldFetch(true);
        }
    }, [loading]);

    return (
        <Grid container spacing={6}>
            {data.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={3}>
                    <HorizontalWithSubtitle {...item} />
                </Grid>
            ))}
        </Grid>
    );
}

export default GovenorCards;