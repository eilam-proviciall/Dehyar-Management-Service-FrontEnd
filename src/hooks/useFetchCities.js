import { useState, useEffect } from 'react';
import { getCity } from "@/Services/CountryDivision";
import api from '@/utils/axiosInstance';

export const useFetchCities = (shouldFetchCities) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            await api.get(getCity(), { requiresAuth: true })
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
