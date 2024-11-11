import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle';
import { user } from '@/Services/Auth/AuthService';
import api from '@/utils/axiosInstance';

const GovenorCards = ({ loading, setLoading, userGeoState }) => {

    // States
    const [userList, setUserList] = useState([]);
    const [CFODetails, setCFODetails] = useState([]);
    const [bakhshdarDetails, setBakhshdarDetails] = useState([]);

    // Vars
    const data = [
        {
            title: 'مسئول امور مالی',
            value: CFODetails.length,
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
            value: bakhshdarDetails.length,
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
        api.get(user(), { requiresAuth: true })
            .then((response) => {
                const filteredUsers = response.data.data.filter(item => item.geo_state === userGeoState);
                setUserList(filteredUsers);
                setCFODetails(filteredUsers.filter(item => item.work_group === 13));
                setBakhshdarDetails(filteredUsers.filter(item => item.work_group === 14));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (userGeoState) {
            fetchData();
        }
    }, [userGeoState]);

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