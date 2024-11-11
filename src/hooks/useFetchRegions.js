import { useState, useEffect } from 'react';
import { getRegion } from "@/Services/CountryDivision";
import api from '@/utils/axiosInstance';

export const useFetchRegions = (shouldFetchRegions,userData) => {
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
            setIsLoading(true);
            await api.get(getRegion(), { requiresAuth: true })
                .then(response => {
                    setRegions(response.data.data.filter(region=> region.city.geo_state === userData));
                })
                .catch(err => setError(err))
                .finally(setIsLoading(false));
        };

        if (shouldFetchRegions) {
            fetchRegions();
        }

    }, [shouldFetchRegions]);

    return { regions, isLoading, error };
};
