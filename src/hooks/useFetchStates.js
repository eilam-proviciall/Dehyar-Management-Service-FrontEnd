import { useState, useEffect } from 'react';
import api from '@/utils/axiosInstance';
import {getState} from "@/Services/DataService";

export const useFetchStates = (shouldFetchCities) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            await api.get(getState(), { requiresAuth: true })
                .then(response => setCities(response.data.data))
                .catch(err => setError(err))
                .finally(setIsLoading(false));
        }
        if (shouldFetchCities) {
            fetchCities();
        }

    }, [shouldFetchCities]);

    return { cities, isLoading, error };
};
