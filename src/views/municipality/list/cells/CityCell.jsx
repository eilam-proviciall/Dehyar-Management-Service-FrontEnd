import { getGeoData } from '@/Services/DataService';
import api from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react'

const CityCell = ({ city }) => {
    const [currentCity, setCurrentCity] = useState('');

    useEffect(() => {
        console.log("State => ", city);

        const fetchData = async () => {
            try {
                const cityResponse = await api.get(`${getGeoData()}?level=city&hierarchy_code=${city}`, { requiresAuth: true });
                setCurrentCity(cityResponse?.data[0]?.approved_name || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [city]);

    return (
        <div style={{ textAlign: 'right' }}>{city !== null ? currentCity ? currentCity : <span className='animate-pulse'>در حال بارگذاری</span> : ''}</div>
    );

}

export default CityCell