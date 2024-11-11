import { useState, useEffect } from 'react';
import { getRegion } from "@/Services/CountryDivision";
import api from '@/utils/axiosInstance';

export const useFetchRegions = (shouldFetchRegions, userData) => {
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(getRegion(), { requiresAuth: true });
                const data = response.data.data;

                if (userData) {
                    setRegions(data.filter(region => region.city.geo_state === userData));
                } else {
                    setRegions(data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldFetchRegions) {
            fetchRegions();
        }

    }, [shouldFetchRegions, userData]);

    return { regions, isLoading, error };
};