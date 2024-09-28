import { getGeoData } from '@/Services/DataService';
import api from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react'

const StateCell = ({ state }) => {
    const [currentState, setCurrentState] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateResponse = await api.get(`${getGeoData()}?level=state&hierarchy_code=${state}`, { requiresAuth: true });
                setCurrentState(stateResponse?.data[0]?.approved_name || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [state]);

    return (
        <div style={{ textAlign: 'right' }}>{currentState || ''}</div>
    );

}

export default StateCell